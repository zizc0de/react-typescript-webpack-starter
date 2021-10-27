import HttpException from '../../exceptions/HttpException';

enum ErrorSource {
  EXTERNAL = 'external',
}

class HttpError extends HttpException {
  constructor(err: any) {
    super(err);

    this.setStatus(err.response.status);

    const { title, message } = err.response.data;

    this.setResponseData({
      source: ErrorSource.EXTERNAL,
      statusCode: this.status,
      name: title,
      message,
    });
  }
}

export default HttpError;
