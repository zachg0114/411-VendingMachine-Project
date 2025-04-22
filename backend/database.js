const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    // Ensure the products database is used
    const uri = process.env.MONGO_URI.includes('products')
      ? process.env.MONGO_URI
      : process.env.MONGO_URI.replace(/(mongodb(\+srv)?:\/\/[^\/]+)(\/)?/, '$1/products');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully to products database");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
