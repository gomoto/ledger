export class HttpError<T> extends Error {
  constructor(
    public status: number,
    public body: T,
  ) {
    super(`${status}: ${JSON.stringify(body, null, 2)}`);
  }
}
