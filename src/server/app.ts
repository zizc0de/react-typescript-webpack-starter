import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import cors from 'cors';

import { errorHandler } from './middleware/error.middleware';
import loggerMiddleware from './middleware/logger.middleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use(express.static(path.resolve(__dirname, '../client')));

app.use(cors({ origin: '*' }));

app.get('/ping', (req: Request, res: Response) => res.send('OK'));

app.use(errorHandler);

app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, '../client/index.html')),
);

export default app;
