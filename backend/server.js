require('dotenv').config(); // Add this line at the top
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database');

const startServer = async () => {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    const app = express();
    app.use(cors()); // Allow all origins
    app.use(express.json());

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1); // Exit the process if the server cannot start
  }
};

startServer();