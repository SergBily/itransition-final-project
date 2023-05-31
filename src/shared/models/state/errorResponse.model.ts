interface ErrorResponse {
  status: number,
  data: ErrorData
}

export interface ErrorData {
  message: string;
  errors: string[];
}

export default ErrorResponse;
