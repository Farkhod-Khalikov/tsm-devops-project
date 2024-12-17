import mongoose from 'mongoose';
import connectDB from '../utils/db'; // Function that connects to MongoDB
import Logger from '../utils/logger'; // Custom logger for logging messages

jest.setTimeout(10000); // Extend Jest timeout for longer operations

describe('MongoDB Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mock calls before each test
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
  });

  it('should connect to the database', async () => {
    const spyLogger = jest.spyOn(Logger, 'info');
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1);
    expect(spyLogger).toHaveBeenCalledWith(
      expect.stringMatching(/MongoDB connected: .+/),
    );
  });

  it('should fail to connect with an invalid URI', async () => {
    const spyLogger = jest.spyOn(Logger, 'error');
    process.env.DB_URI = 'invalid-connection-string';

    // Now connectDB will throw an error, and we can test for it
    await expect(connectDB()).rejects.toThrow('MongoDB connection failed');

    expect(spyLogger).toHaveBeenCalledWith(
      expect.stringContaining('MongoDB connection failed'),
    );
  });
});
