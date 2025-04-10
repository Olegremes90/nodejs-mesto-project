class AuthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizedError);
    }
  }
}

export default AuthorizedError;