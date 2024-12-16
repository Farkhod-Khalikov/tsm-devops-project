// src/index.ts
import dotenv from 'dotenv';
import app from './express'; // Assuming Express app is set up in express.ts
import Logger from './utils/logger';
import connectDB from './utils/db'; // Import the MongoDB connection function

// Use environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

try {
  app.listen(process.env.PORT || 5000, () => {
    Logger.info('Express server started');
  });
} catch (error) {
  Logger.error('Error starting Express server');
}
