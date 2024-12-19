// src/utils/express
import express from 'express';
import AuthRoutes from '../routes/auth.routes';

// init express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// auth routes
app.use('/api/auth', AuthRoutes);

// Example route
app.get('/', (req, res) => {
  // just respond text to a homepage that is /
  res.send('Hello, Express with TypeScript!');
});

export default app;
