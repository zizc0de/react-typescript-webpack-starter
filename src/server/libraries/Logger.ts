import winston from 'winston';

const loggerTransports = [new winston.transports.Console()];

const loggerFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(
    ({ timestamp, level, message, meta }) =>
      `${timestamp} ${level} ${message} ${meta ? JSON.stringify(meta) : ''}`,
  ),
);

const logger = winston.createLogger({
  format: loggerFormat,
  transports: loggerTransports,
});

export default logger;

export { loggerFormat, loggerTransports };
