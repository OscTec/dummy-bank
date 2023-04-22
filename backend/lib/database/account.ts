import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
  GetItemCommand,
  TransactWriteItemsCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { getConfig } from "../config";
import { Account } from "../schema/account";

const client = new DynamoDBClient({});

export const getAccountById = async (id: string): Promise<Account | null> => {
  const params = {
    TableName: getConfig("accountTable"),
    Key: {
      id: { S: id },
    },
  };

  try {
    const response = await client.send(new GetItemCommand(params));

    if (!response.Item) {
      return null;
    }

    return unmarshall(response.Item) as Account;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return null;
  }
};

export const getAccountsByUserId = async (userId: string): Promise<Account[] | []> => {
  const params = {
    TableName: getConfig("accountTable"),
    IndexName: "userIdIndex",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
  };

  try {
    const response = await client.send(new QueryCommand(params));

    if (!response.Items) {
      return [];
    }

    return response.Items.map((item) => unmarshall(item) as Account)
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return [];
  }
};

export const post = async (account: Account): Promise<Account | null> => {
  const params = {
    TableName: getConfig("accountTable"),
    Item: marshall(account),
  };

  try {
    await client.send(new PutItemCommand(params));

    return account;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return null;
  }
};

export const transferMoney = async (sourceAccountId: string, destinationAccountId: string, amount: number): Promise<boolean> => {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: getConfig("accountTable"),
          Key: marshall({ id: sourceAccountId }),
          UpdateExpression: "set balance = balance - :amount",
          ExpressionAttributeValues: marshall({ ":amount": amount }),
          ReturnValuesOnConditionCheckFailure: "ALL_OLD",
        },
      },
      {
        Update: {
          TableName: getConfig("accountTable"),
          Key: marshall({ id: destinationAccountId }),
          UpdateExpression: "set balance = balance + :amount",
          ExpressionAttributeValues: marshall({ ":amount": amount }),
          ReturnValuesOnConditionCheckFailure: "ALL_OLD",
        },
      },
    ],
  };

  try {
    await client.send(new TransactWriteItemsCommand(params));

    return true;
  }
  catch (error) {
    console.error("DynamoDB error: ", error);
    return false;
  }
}
