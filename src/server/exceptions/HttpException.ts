class HttpException extends Error {
  public name: string;
  public status: number;
  public message: string;
  public response: any;

  constructor(err: { status: number; message: string }) {
    super();

    this.name = this.constructor.name;

    this.status = err.status;
    this.message = err.message;
  }

  setStatus(status: number) {
    this.status = status;
  }

  setResponseData(data: any) {
    this.response = { error: data };
  }
}

export default HttpException;
