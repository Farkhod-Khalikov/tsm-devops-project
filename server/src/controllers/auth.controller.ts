// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import Logger from '../utils/logger';

// authorization and registration contoller
export default class AuthController {
  // registration controller
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
        Logger.error(`Registration error: ${error.message}`);
        res.status(400).json({ message: error.message });
      }
    }
  }
  static async authorize(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }
      // find user by username
      // check whether password matches
      //
    } catch (error) {}
  }
}
