import { createLightship, Lightship, ConfigurationInput } from 'lightship';
import dotenv from 'dotenv';

import app from './app';
import logger from './libraries/Logger';

dotenv.config();

const { HOST, PORT } = process.env;

const applicationHost: string = HOST || 'localhost';
const applicationPort: number = Number(<string>PORT) || 7000;

const lightshipConfiguration: ConfigurationInput = {
  port: applicationPort + 1,
};

const lightship: Lightship = createLightship(lightshipConfiguration);

const service = app.listen(applicationPort, applicationHost, () =>
  logger.info(`Server running on ${applicationHost}:${applicationPort}`),
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

lightship.registerShutdownHandler(async () => {
  // Here, this service receive kill signal from kubernetes.
  // After all these shutdown handlers have been executed
  // Lightship will asks `process.exit()` to terminate the process synchronously

  logger.info('service is shutting down..');

  // Allow sufficient amount of time to allow all of the existing
  // HTTP requests to finish before terminating the service.
  await delay(60 * 1000);

  // shutdown service
  service.close();
});

// signal that the service is now ready to accept connections.
lightship.signalReady();
