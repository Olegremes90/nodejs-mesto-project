class ErrorRights extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorRights);
    }
  }
}

export default ErrorRights;