// src/routes/auth.routes

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

// initialize router
const router = Router();

// POST /api/auth/register - Register a new user
router.post('/register', AuthController.register);

export default router;
