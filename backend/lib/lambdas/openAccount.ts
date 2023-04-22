import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { pick } from "lodash";
import { nanoid } from "nanoid";

import { post as createAccount } from "../database/account";
import { generateErrorResponse, generateSuccessResponse } from "../helpers/generateHttpResponse";
import { validate } from "../schema/account";
import { verifyToken } from '../helpers/jwt';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.headers || !event.headers["x-auth-token"]) {
    return generateErrorResponse({
      message: "Invalid user data",
    });
  }

  if (!event.body) {
    return generateErrorResponse({
      message: "Invalid user data",
    });
  }

  const decoded = verifyToken(event.headers["x-auth-token"]);

  const { accountType } = JSON.parse(event.body);
  const account = {
    id: nanoid(),
    userId: decoded.id,
    balance: 100, // Starting balance, since this is a demo
    accountType,
  };

  if (!validate(account)) {
    return generateErrorResponse({
      message: "Invalid user data",
    }, 400);
  }

  try {
    await createAccount(account);

    return generateSuccessResponse({
      ...pick(account, ["id", "balance", "accountType"]),
    });
  } catch (error) {
    if (error instanceof Error) {
      return generateErrorResponse({
        message: "Failed to open account",
        error: error.message,
      });
    } else {
      return generateErrorResponse({
        message: "Failed to open account",
        error: "Unknown error",
      });
    }
  }
};
