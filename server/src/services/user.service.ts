import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.schema';

// Custom Error Class
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class UserService {
  // Register a new user
  static async registerUser(username: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new CustomError('Username already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    return await newUser.save();
  }

  // Login user
  static async loginUser(username: string, password: string): Promise<string> {
    const user = await User.findOne({ username }).select('password username');  // Select only needed fields
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid password', 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );
    return token;
  }
}
