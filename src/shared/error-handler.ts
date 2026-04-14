import { ServerResponse } from "node:http";

export default class ApiError extends Error {
  statusCode: number;
  validationErrors?: { [key: string]: string };

  constructor(message: string, { statusCode, validationErrors }: { statusCode?: number; validationErrors?: { [key: string]: string } } = {}) {
    super(message);
    this.statusCode = statusCode || 500;
    this.validationErrors = validationErrors;
  }

  static handleError(err: ApiError, response: ServerResponse) {
    console.error(err);

    response.statusCode = err.statusCode || 500;

    return response.end(JSON.stringify({
      success: false,
      message: response.statusCode === 500 ? "Internal Server Error" : err.message || "Internal Server Error",
      errors: err.validationErrors || null
    }));
  }
}