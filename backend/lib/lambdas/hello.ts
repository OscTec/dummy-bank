import { generateHttpResponse } from "../helpers/generateHttpResponse";

export const handler = async (event: any = {}): Promise<any> => {
  return generateHttpResponse(200, {
    message: "Hello World!",
    input: event,
  });
};
