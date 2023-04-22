import { AttributeType, BillingMode, GlobalSecondaryIndexProps, Table } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy, Stack } from "aws-cdk-lib";

import { getConfig } from "../config";

// For a real world project, using destroy as the removal policy is not a good idea in most case.
// But for this demo, it's fine.
export const createDdbTable = (
  stack: Stack,
  tableName: string,
  partitionKey: { name: string; type: AttributeType },
  gsis?: GlobalSecondaryIndexProps[]
): Table => {
  const table = new Table(stack, `${getConfig('serviceName')}-${tableName}`, {
    tableName: getConfig(tableName),
    partitionKey,
    billingMode: BillingMode.PAY_PER_REQUEST,
    removalPolicy: RemovalPolicy.RETAIN,
    pointInTimeRecovery: false,
  });

  if (gsis) {
    gsis.forEach((gsi) => {
      const { indexName, partitionKey, sortKey, projectionType } = gsi
      table.addGlobalSecondaryIndex({
        indexName,
        partitionKey,
        sortKey,
        projectionType,
      })
    })
  }

  return table
}
