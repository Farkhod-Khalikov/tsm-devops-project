// src/services/user.service.ts
import User, { IUser } from '../models/user.schema';
import bcrypt from 'bcryptjs';

export default class UserService {
  // Register a new user
  static async registerUser(username: string, password: string): Promise<IUser> {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });

    return await newUser.save();
  }
}
