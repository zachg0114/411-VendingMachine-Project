require('dotenv').config();
console.log('database.js loaded'); // Debug: module loaded
const mongoose = require('mongoose');

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables!');
  process.exit(1);
}

mongoose.connection.on('open', () => {
  console.log('Mongoose event: connection open');
});
mongoose.connection.on('error', (err) => {
  console.error('Mongoose event: connection error', err);
});

const connectToDatabase = async () => {
  console.log('Attempting to connect to MongoDB...'); // Debug: connection attempt started
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail faster if no connection
    });
    console.log('MongoDB connection established:', connection.connection.host);
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error; // Ensure the error propagates to the caller
  }
};

module.exports = connectToDatabase;
