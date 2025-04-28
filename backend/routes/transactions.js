const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Ensure connection to the correct database
mongoose.connection.useDb("products");

// POST /api/transactions - Add a new transaction
router.post("/", async (req, res) => {
  try {
    console.log("POST /api/transactions called with data:", req.body); // Debug log
    // Find the highest orderId in the transactions collection
    const lastTransaction = await Transaction.findOne().sort({ orderId: -1 });
    const nextOrderId = (lastTransaction?.orderId || 0) + 1;

    // Create a new transaction with the next orderId
    const newTransaction = new Transaction({
      ...req.body,
      orderId: nextOrderId,
    });

    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ message: "Failed to add new transaction" });
  }
});

// GET /api/transactions - Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

module.exports = router;
