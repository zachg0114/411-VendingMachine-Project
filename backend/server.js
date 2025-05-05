const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database");
const drinkRoutes = require("./routes/drinks");
const snackRoutes = require("./routes/snacks");
const transactionsRoute = require("./routes/transactions");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use("/api/transactions", transactionsRoute);
app.use("/api/snacks", snackRoutes);
app.use("/api/drinks", drinkRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
