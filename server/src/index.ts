import dotenv from 'dotenv';
import app from './express'; // Import Express app from express.ts

// use environment variables
dotenv.config();

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000}`,
  );
});
