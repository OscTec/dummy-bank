import { NestedStack, Stack } from 'aws-cdk-lib'
import { RestApi, LambdaIntegration, EndpointType } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Cors } from "aws-cdk-lib/aws-apigateway";
import { createNodeJsFunction } from '../helpers/createNodeJsFunction';

export class StatelessStack extends NestedStack {
  
  constructor (appStack: Stack, id: string) {
    super(appStack, id)

    const helloLambda = createNodeJsFunction(this, "hello", {
      entry: "lib/lambdas/hello.ts",
    })

    const registerUserLambda = createNodeJsFunction(this, "registerUser", {
      entry: "lib/lambdas/registerUser.ts",
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
      bundling: {
        nodeModules: ["bcrypt"],
      },
    })

    // NOTE - In a real project, you would use a KMS key to encrypt the secret
    // and then use the key to decrypt it at runtime. This is just a demo and I
    // didn't want to pay $0.4 a month :D.
    const authUserLambda = createNodeJsFunction(this, "authUser", {
      entry: "lib/lambdas/authUser.ts",
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
      bundling: {
        nodeModules: ["bcrypt"],
      },
    })

    const openAccountLambda = createNodeJsFunction(this, "openAccount", {
      entry: "lib/lambdas/openAccount.ts",
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
    })

    const getAccountLambda = createNodeJsFunction(this, "getAccount", {
      entry: "lib/lambdas/getAccounts.ts",
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
    })

    const transferMoneyLambda = createNodeJsFunction(this, "transferMoney", {
      entry: "lib/lambdas/transferMoney.ts",
      environment: {
        JWT_SECRET: StringParameter.valueForStringParameter(
          this,
          "quarkBank_jwtPrivateKey",
          1
        ),
      },
    })

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
        actions: ["dynamodb:GetItem", "dynamodb:Query"],
        resources: ["*"],
      })
    );

    openAccountLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["dynamodb:PutItem"],
        resources: ["*"],
      })
    );

    getAccountLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["dynamodb:GetItem", "dynamodb:Query"],
        resources: ["*"],
      })
    );

    transferMoneyLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["dynamodb:UpdateItem", "dynamodb:GetItem", "dynamodb:Query"],
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

    const accounts = api.root.addResource("accounts");
    accounts.addMethod("GET", new LambdaIntegration(getAccountLambda));
    accounts.addMethod("POST", new LambdaIntegration(openAccountLambda));

    const transfers = api.root.addResource("transfers");
    transfers.addMethod("POST", new LambdaIntegration(transferMoneyLambda));
  }
}
