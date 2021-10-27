import type { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';

import { loggerFormat, loggerTransports } from '../libraries/Logger';

const loggerOptions: expressWinston.LoggerOptions = {
  format: loggerFormat,
  transports: loggerTransports,
};

export default (req: Request, res: Response, next: NextFunction) =>
  expressWinston.logger(loggerOptions)(req, res, next);
