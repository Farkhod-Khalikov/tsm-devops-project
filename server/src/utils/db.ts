// src/utils/db.ts

import mongoose from 'mongoose';
import Logger from './logger'; // Assuming logger is already set up

const connectDB = async () => {
  try {
    // while testing on localhost mongo db just using dirrect localhost url
    const conn = await mongoose.connect(
      process.env.DB_URI ||  'mongodb://localhost:27017/tsm-db',
      {},
    );
    Logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      Logger.error(`MongoDB connection failed: ${error.message}`);
    } else {
      Logger.error('MongoDB connection failed: ' + error);
    }
    process.exit(1);
  }
};

export default connectDB;
