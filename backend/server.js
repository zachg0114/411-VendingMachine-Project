const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database");
const drinkRoutes = require("./routes/drinks");
const snackRoutes = require("./routes/snacks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    // Allow requests from any localhost port (e.g., 3000, 3001, etc.)
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests
      // Allow localhost on any port, or 127.0.0.1
      if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        return callback(null, true);
      }
      // Optionally allow other origins, e.g., for production
      // if (/^https:\/\/your-production-domain\.com$/.test(origin)) {
      //   return callback(null, true);
      // }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// Debug: Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use("/api/drinks", drinkRoutes);
app.use("/api/snacks", snackRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
