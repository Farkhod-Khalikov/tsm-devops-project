import { Request, Response } from 'express';
import UserService from '../services/user.service';
import Logger from '../utils/logger';

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Register user
      const user = await UserService.registerUser(username, email, password);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
      Logger.info(`User registered: ${email}`);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        Logger.error(`Registration error: ${error.message}`);
      }
    }
  }
}
