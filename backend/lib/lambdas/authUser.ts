import * as bcrypt from "bcrypt";

import * as queryUser from "../database/user";
import { generateErrorResponse, generateSuccessResponse } from "../helpers/generateHttpResponse";
import { generateToken } from "../helpers/jwt";
import { validate } from "../schema/auth";

export const handler = async (event: any = {}): Promise<any> => {
  const { email, password } = JSON.parse(event.body);
  const validatedAuth = validate({ email, password });

  if (!validatedAuth.success) {
    return generateErrorResponse({
      message: "Invalid user data",
      error: validatedAuth.error,
    }, 400);
  }

  try {
    const response = await queryUser.get(email);

    if (!response) {
      return generateErrorResponse({
        message: "Invalid email or password",
      }, 400);
    }

    const validPassword = await bcrypt.compare(password, response.password);

    if (!validPassword) {
      return generateErrorResponse({
        message: "Invalid email or password",
      }, 400);
    }

    const token = generateToken(response);

    return generateSuccessResponse(
      token,
      200,
      {
        "Access-Control-Allow-Origin": "*",
      });
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
