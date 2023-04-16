interface HttpResponse {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: any;
  body: string;
}

export const generateHttpResponse = (
  statusCode: number,
  body: any,
  headers?: any
): HttpResponse => {
  return {
    isBase64Encoded: false,
    statusCode,
    headers: {
      "test-header": "test-header-value",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(
      {
        ...body,
      },
      null,
      2
    ),
  };
};

export const generateSuccessResponse = (body: any, statusCode?: number, headers?: any,) => {
  return {
    statusCode: statusCode || 200,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      ...headers,
    },
  }
}

export const generateErrorResponse = (body: any, statusCode?: number, headers?: any,) => {
  return {
    statusCode: statusCode || 500,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      ...headers,
    },
  }
}
