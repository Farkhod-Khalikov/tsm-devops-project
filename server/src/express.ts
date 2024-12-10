import express from 'express';

// init express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  // just respond text to a homepage that is /
  res.send('Hello, Express with TypeScript!');
});

export default app;
