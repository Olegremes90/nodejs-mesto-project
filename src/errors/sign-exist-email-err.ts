class FoundExistEmailError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FoundExistEmailError);
    }
  }
}

export default FoundExistEmailError;