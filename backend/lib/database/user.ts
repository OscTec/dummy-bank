import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { getConfig } from "../config";
import { User } from "../schema/user";

const client = new DynamoDBClient({});

export const get = async (email: string): Promise<User | null> => {
  const params = {
    TableName: getConfig("userTable"),
    Key: marshall({ email }),
  };

  try {
    const res = await client.send(new GetItemCommand(params));

    if (!res.Item) {
      return null;
    }

    const user = unmarshall(res.Item) as User;

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
