import { NestedStack, Stack, RemovalPolicy } from 'aws-cdk-lib'
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb'
import { getConfig } from '../config';

export class StatefulStack extends NestedStack {
  public readonly userTable: Table

  constructor (appStack: Stack, id: string) {
    super(appStack, id)

    const userTable = new Table(appStack, `${getConfig('serviceName')}-UserTable`, {
      tableName: getConfig("userTable"),
      partitionKey: { name: "email", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      pointInTimeRecovery: false,
    });

    this.userTable = userTable
  }
}
