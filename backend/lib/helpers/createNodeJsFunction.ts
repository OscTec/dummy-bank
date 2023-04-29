import { Stack } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

interface NodejsFunctionProps {
  entry: string
  handler?: string
  runtime?: Runtime
  architecture?: Architecture
  environment?: Record<string, string>
  bundling?: Record<string, string[]>
}

export const createNodeJsFunction = (
  stack: Stack,
  id: string,
  props: NodejsFunctionProps
): NodejsFunction => {
  const { entry, handler, runtime, architecture, environment, bundling } = props

  const lambda = new NodejsFunction(stack, id, {
    entry,
    handler: handler ?? 'handler',
    runtime: runtime ?? Runtime.NODEJS_18_X,
    architecture: architecture ?? Architecture.ARM_64,
    environment,
    logRetention: RetentionDays.ONE_DAY,
    bundling: {
      minify: true,
      ...bundling,
    },
  })

  return lambda
}
