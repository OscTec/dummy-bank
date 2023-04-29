import { generateErrorResponse } from "../helpers/generateHttpResponse";
import { getAccountById, getAccountsByUserId, transferMoney } from "../database/account";
import { verifyToken } from "../helpers/jwt";
import { Account } from "../schema/account";

const isTransferValid = (sourceAccount: Account, destinationAccount: Account, amount: number, reference: string): boolean => {
  if (!sourceAccount || !destinationAccount || !amount || amount <= 0 || reference.length > 100) {
    return false
  }

  return true
}


export const handler = async (event: any = {}): Promise<any> => {
  if (!event.headers || !event.headers["x-auth-token"]) {
    return generateErrorResponse({
      message: "Invalid user data",
    });
  }

  let decoded;

  try {
    decoded = verifyToken(event.headers["x-auth-token"]);
  } catch (error) {
    return generateErrorResponse({
      message: "Invalid user data",
    }, 400);
  }
  
  if (!decoded) {
    return generateErrorResponse({
      message: "Invalid user data",
    }, 400);
  }

  const { sourceAccountId, destinationAccountId, amount, reference } = JSON.parse(event.body);

  if (!isTransferValid(sourceAccountId, destinationAccountId, amount, reference)) {
    return generateErrorResponse({
      message: "Invalid user data",
    }, 400);
  }

  try {
    const response = await getAccountsByUserId(decoded.id);
    const sourceAccount = response.find((account) => account.id === sourceAccountId);

    if (!sourceAccount) {
      return generateErrorResponse({
        message: "Invalid user data",
      }, 400);
    }

    if (sourceAccount.balance < amount) {
      return generateErrorResponse({
        message: "Invalid user data",
      }, 400);
    }

    const destinationAccount = await getAccountById(destinationAccountId);

    if (!destinationAccount) {
      return generateErrorResponse({
        message: "Invalid user data",
      }, 400);
    }

    const transferResponse = await transferMoney(sourceAccountId, destinationAccountId, amount, reference);

    if (!transferResponse) {
      return generateErrorResponse({
        message: "Invalid user data",
      }, 400);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Transfer successful",
      }),
    };

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
}
