import { NestedStack, Stack } from 'aws-cdk-lib'
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb'
import { getConfig } from '../config';
import { createDdbTable } from '../helpers/createDdbTable';

export class StatefulStack extends NestedStack {
  public readonly userTable: Table
  public readonly accountTable: Table
  public readonly transactionTable: Table

  constructor (appStack: Stack, id: string) {
    super(appStack, id)

    const userTable = createDdbTable(appStack, {
      tableName: getConfig('userTable'),
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      gsis: [
        {
          indexName: "emailIndex",
          partitionKey: {
            name: "email",
            type: AttributeType.STRING,
          },
        }
      ]
    })

    const accountTable = createDdbTable(appStack, {
      tableName: getConfig('accountTable'),
      partitionKey:{
        name: "id",
        type: AttributeType.STRING,
      },
      gsis: [
        {
          indexName: "userIdIndex",
          partitionKey: {
            name: "userId",
            type: AttributeType.STRING,
          },
        }
      ]
    })

    const transactionTable = createDdbTable(appStack, {
      tableName: getConfig('transactionTable'),
      partitionKey: {
        name: "accountId",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "transactionId",
        type: AttributeType.STRING,
      }
    })

    this.userTable = userTable
    this.accountTable = accountTable
    this.transactionTable = transactionTable
  }
}
