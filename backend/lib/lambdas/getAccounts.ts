import * as queryAccounts from "../database/account";
import { generateErrorResponse, generateSuccessResponse } from "../helpers/generateHttpResponse";
import { verifyToken } from "../helpers/jwt";

export const handler = async (event: any = {}): Promise<any> => {
  console.log("Event: ", event)
  if (!event.headers || !event.headers["x-auth-token"]) {
    return generateErrorResponse({
      message: "Invalid user data",
    });
  }

  let decoded
  try {
    decoded = verifyToken(event.headers["x-auth-token"]);
    console.log("Decoded token: ", decoded);
  } catch (error) {
    return generateErrorResponse({
      message: "Invalid token",
    }, 400);
  }

  try {
    const response = await queryAccounts.getAccountsByUserId(decoded.id);
    console.log("Response: ", response)

    return generateSuccessResponse(response);
  } catch (error) {
    console.error("DynamoDB error: ", error);
    if (error instanceof Error) {
      return generateErrorResponse({
        message: "Failed to auth user",
        error: error.message,
      });
    }
    return generateErrorResponse({
      message: "Failed to auth user",
      error: "Unknown error",
    });
  }
};
