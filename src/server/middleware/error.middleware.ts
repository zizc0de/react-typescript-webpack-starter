import type { NextFunction, Request, Response } from 'express';

import HttpError from '../utils/errors/HttpError';
import HttpException from '../exceptions/HttpException';
import logger from '../libraries/Logger';

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err?.response) {
    const httpError = new HttpError(err);

    logger.error(JSON.stringify(httpError.response));

    return res.status(httpError.status).json(httpError.response);
  }

  const error = {
    source: 'internal',
    statusCode: err.status || 500,
    message: err.message || 'Something went wrong',
  };

  logger.error(JSON.stringify(error));

  return res.status(error.statusCode).json({ error });
};
