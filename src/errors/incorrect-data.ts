class IncorrectData extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IncorrectData);
    }
  }
}

export default IncorrectData;
