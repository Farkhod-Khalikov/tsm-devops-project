import dotenv from 'dotenv';
import app from './express'; // Import Express app from express.ts
import Logger from './utils/logger';

// Use environment variables
dotenv.config();

try {
  // Start the Express server
  app.listen(process.env.PORT || 5000, () => {
    Logger.info('Express server is starting...');
  });
} catch (error) {
  // Handle errors and log them
  if (error instanceof Error) {
    Logger.error(`Server failed to start: ${error.message}`);
  } else {
    Logger.error('Unknown error occurred while starting the server');
  }
}
