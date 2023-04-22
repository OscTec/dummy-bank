import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { getConfig } from "../config";
import { User } from "../schema/user";

const client = new DynamoDBClient({});

export const get = async (email: string): Promise<User | null> => {
  const params = {
    TableName: getConfig("userTable"),
    IndexName: "emailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  };

  try {
    const response = await client.send(new QueryCommand(params));
    if (!response.Items) {
      return null;
    }

    const user = unmarshall(response.Items[0]) as User;

    return user;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return null;
  }
};

export const post = async (user: User): Promise<User | null> => {
  const params = {
    TableName: getConfig("userTable"),
    Item: marshall(user),
  };

  try {
    await client.send(new PutItemCommand(params));

    return user;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return null;
  }
};
