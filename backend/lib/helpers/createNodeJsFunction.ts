import { Stack } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

interface NodejsFunctionProps {
  entry: string
  handler?: string
  runtime?: Runtime
  environment?: Record<string, string>
  bundling?: Record<string, string[]>
}

export const createNodeJsFunction = (
  stack: Stack,
  id: string,
  props: NodejsFunctionProps
): NodejsFunction => {
  const { entry, handler, runtime, environment, bundling } = props

  const lambda = new NodejsFunction(stack, id, {
    entry,
    handler: handler ?? 'handler',
    runtime: runtime ?? Runtime.NODEJS_18_X,
    environment,
    bundling: {
      minify: true,
      ...bundling,
    },
  })

  return lambda
}
