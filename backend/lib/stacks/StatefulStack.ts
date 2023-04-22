import { NestedStack, Stack, RemovalPolicy } from 'aws-cdk-lib'
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb'
import { getConfig } from '../config';
import { createDdbTable } from '../helpers/createDdbTable';

export class StatefulStack extends NestedStack {
  public readonly userTable: Table
  public readonly accountTable: Table
  public readonly transactionTable: Table

  constructor (appStack: Stack, id: string) {
    super(appStack, id)

    const userTable = createDdbTable(appStack, "userTable", {
      name: "id",
      type: AttributeType.STRING,
    },
    [
      {
        indexName: "emailIndex",
        partitionKey: {
          name: "email",
          type: AttributeType.STRING,
        },
      }
    ])

    const accountTable = createDdbTable(appStack, "accountTable", {
      name: "id",
      type: AttributeType.STRING,
    },
    [
      {
        indexName: "userIdIndex",
        partitionKey: {
          name: "userId",
          type: AttributeType.STRING,
        },
      }
    ]
    )

    const transactionTable = createDdbTable(appStack, "transactionTable", {
      name: "id",
      type: AttributeType.STRING,
    })

    this.userTable = userTable
    this.accountTable = accountTable
    this.transactionTable = transactionTable
  }
}
