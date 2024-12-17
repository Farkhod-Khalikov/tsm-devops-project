import mongoose from 'mongoose';
import Logger from './logger'; // Custom logger for logging messages

const connectDB = async (): Promise<void> => {
  const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/test-db';

  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(dbURI, {});
    Logger.info(`MongoDB connected: ${dbURI}`);
  } catch (error) {
    if (error instanceof Error) {
      // Log the error and throw to ensure the promise rejects
      Logger.error(`MongoDB connection failed: ${error.message}`);
    }
    throw new Error('MongoDB connection failed'); // Ensure rejection for tests
  }
};

export default connectDB;
