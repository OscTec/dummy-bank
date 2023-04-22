import { generateSuccessResponse } from "../helpers/generateHttpResponse";

export const handler = async (event: any = {}): Promise<any> => {
  return generateSuccessResponse({
    message: "Hello World!",
    input: event,
  });
};
