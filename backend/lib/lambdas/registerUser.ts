import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import * as bcrypt from "bcrypt";
import { pick } from "lodash";

import { get as getUser, post as createUser } from "../database/user";
import { generateErrorResponse, generateSuccessResponse } from "../helpers/generateHttpResponse";
import { generateToken } from "../helpers/jwt";
import { validate } from "../schema/user";

const client = new DynamoDBClient({});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return generateErrorResponse({
      message: "Invalid user data",
    });
  }

  const { name, email, password } = JSON.parse(event.body);
  const user = {
    email,
    name,
    password,
  };

  if (!validate(user)) {
    return generateErrorResponse({
      message: "Invalid user data",
    }, 400);
  }

  try {
    const response = await getUser(email);
    if (response) {
      return generateErrorResponse({
        message: "User already registered",
      }, 400);
    }
  } catch (error) {
    if (error instanceof Error) {
      return generateErrorResponse({
        message: "Failed to register user",
        error: error.message,
      });
    } else {
      return generateErrorResponse({
        message: "Failed to register user",
        error: "Unknown error",
      });
    }
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await createUser(user);

    const token = generateToken(user);

    return generateSuccessResponse({
      ...pick(user, ["name", "email"]),
      token,
    },
    200,
    {
      "x-auth-token": token,
      "Access-Control-Expose-Headers": "Content-Type,x-auth-token",
    });
  } catch (error) {
    if (error instanceof Error) {
      return generateErrorResponse({
        message: "Failed to register user",
        error: error.message,
      });
    } else {
      return generateErrorResponse({
        message: "Failed to register user",
        error: "Unknown error",
      });
    }
  }
};
