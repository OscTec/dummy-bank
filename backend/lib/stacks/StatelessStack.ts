import { NestedStack, Stack } from 'aws-cdk-lib'
import { RestApi, LambdaIntegration, EndpointType } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Cors } from "aws-cdk-lib/aws-apigateway";

export class StatelessStack extends NestedStack {
  
  constructor (appStack: Stack, id: string) {
    super(appStack, id)

    const helloLambda = new NodejsFunction(this, "hello", {
      entry: "lib/lambdas/hello.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
        sourceMap: true,
        target: "es2018",
      },
    });

    const registerUserLambda = new NodejsFunction(this, "registerUser", {
      entry: "lib/lambdas/registerUser.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: "es2018",
        nodeModules: ["bcrypt"],
      },
    });

    // NOTE - In a real project, you would use a KMS key to encrypt the secret
    // and then use the key to decrypt it at runtime. This is just a demo and I
    // didn't want to pay $0.4 a month :D.
    const authUserLambda = new NodejsFunction(this, "authUser", {
      entry: "lib/lambdas/authUser.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: "es2018",
        nodeModules: ["bcrypt"],
      },
    });

    registerUserLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["dynamodb:PutItem", "dynamodb:GetItem"],
        resources: ["*"],
      })
    );

    authUserLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["dynamodb:GetItem"],
        resources: ["*"],
      })
    );

    const api = new RestApi(this, "QuarkBankApi", {
      restApiName: "QuarkBankApi",
      description: "This is a Quark bank api",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },
      endpointConfiguration: {
        types: [ EndpointType.REGIONAL ],
      },
    });

    const helloIntegration = new LambdaIntegration(helloLambda);

    const users = api.root.addResource("users");
    users.addMethod("GET", helloIntegration);
    users.addMethod("POST", new LambdaIntegration(registerUserLambda));

    const logins = api.root.addResource("logins");
    logins.addMethod("GET", helloIntegration);
    logins.addMethod("POST", new LambdaIntegration(authUserLambda));

  }
}