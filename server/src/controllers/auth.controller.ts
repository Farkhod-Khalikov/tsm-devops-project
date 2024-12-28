import { Request, Response } from 'express';
import UserService from '../services/user.service';
import Logger from '../utils/logger';

export default class AuthController {
  // Registration controller
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      // Call the UserService to handle registration
      const user = await UserService.registerUser(username, password);

      if (!user) {
        res.status(400).json({ message: 'User registration failed' });
        return;
      }

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user._id, username: user.username },
      });

      Logger.info(`User registered: ${username}`);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Registration error: ${error.message}`);
        res.status(500).json({ message: 'An error occurred during registration' });
      }
    }
  }

  // Authorization controller (login)
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      // Call the UserService to handle login
      const token = await UserService.loginUser(username, password);

      if (!token) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json({
        message: 'User authorized successfully',
        token,
      });

      Logger.info(`User logged in: ${username}`);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Authorization error: ${error.message}`);
        res.status(500).json({ message: 'An error occurred during login' });
      }
    }
  }
}
