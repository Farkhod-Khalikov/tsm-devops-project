// /src/services/user.service
import User, { IUser } from '../models/user.schema';
import bcrypt from 'bcryptjs';

export default class UserService {
  // Register a new user
  static async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash the password
    // NOTE: currently using bcrypt invokes error while building docker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  }
}
