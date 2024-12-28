// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import Logger from '../utils/logger';

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      // Register user
      const user = await UserService.registerUser(username, password);

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user._id, username: user.username },
      });
      Logger.info(`User registered: ${username}`);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        Logger.error(`Registration error: ${error.message}`);
      }
    }
  }
}
