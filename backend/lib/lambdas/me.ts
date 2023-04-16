import { generateHttpResponse } from "../helpers/generateHttpResponse";
import { verifyToken } from "../helpers/jwt";

export const handler = async (event: any): Promise<any> => {
  const token = event.headers["x-atuh-token"];

  if (!token) {
    return generateHttpResponse(401, {
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = verifyToken(token);

    // Instead of returning the decoded token, we can return the user object
    // from the database.
    return generateHttpResponse(200, {
      message: "Authorized",
      decoded,
    });
  } catch (error) {
    if (error instanceof Error) {
      return generateHttpResponse(400, {
        message: "Invalid token.",
        error: error.message,
      });
    }
    return generateHttpResponse(400, {
      message: "Invalid token.",
      error: "Unknown error",
    });
  }
};
