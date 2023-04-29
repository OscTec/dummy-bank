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
import { nanoid } from "nanoid";

const client = new DynamoDBClient({});

const ACCOUNT_TABLE = `${getConfig("serviceName")}-${getConfig("accountTable")}`;
const TRANSACTION_TABLE = `${getConfig("serviceName")}-${getConfig("transactionTable")}`;

export const getAccountById = async (id: string): Promise<Account | null> => {
  const params = {
    TableName: ACCOUNT_TABLE,
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
    TableName: ACCOUNT_TABLE,
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
    TableName: ACCOUNT_TABLE,
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

export const transferMoney = async (senderAccountNumber: string, receiverAccountNumber: string, amount: number, reference: string): Promise<boolean> => {
  const transactionId = nanoid()
  const date = new Date().toISOString()

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: ACCOUNT_TABLE,
          Key: marshall({ id: senderAccountNumber }),
          UpdateExpression: "set balance = balance - :amount, updatedAt = :updatedAt",
          ExpressionAttributeValues: marshall({ ":amount": amount, ":updatedAt": date }),
          ReturnValuesOnConditionCheckFailure: "ALL_OLD",
        },
      },
      {
        Update: {
          TableName: ACCOUNT_TABLE,
          Key: marshall({ id: receiverAccountNumber }),
          UpdateExpression: "set balance = balance + :amount, updatedAt = :updatedAt",
          ExpressionAttributeValues: marshall({ ":amount": amount, ":updatedAt": date }),
          ReturnValuesOnConditionCheckFailure: "ALL_OLD",
        },
      },
      {
        Put: {
          TableName: TRANSACTION_TABLE,
          Item: marshall({
            accountId: senderAccountNumber,
            otherAccountId: receiverAccountNumber,
            transactionId,
            amount,
            reference,
            transactionType: 'DEBIT',
            createdAt: date,
          }),
        }
      },
      {
        Put: {
          TableName: TRANSACTION_TABLE,
          Item: marshall({
            accountId: receiverAccountNumber,
            otherAccountId: senderAccountNumber,
            transactionId,
            amount,
            reference,
            transactionType: 'CREDIT',
            createdAt: date,
          }),
        }
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
