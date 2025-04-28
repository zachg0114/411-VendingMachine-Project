const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Ensure connection to the correct database
mongoose.connection.useDb("products");

// POST /api/transactions - Add a new transaction
router.post("/", async (req, res) => {
  try {
    const { items, subtotal, total, date } = req.body;

    // Validate required fields
    if (!items || !subtotal || !total || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the highest orderId in the transactions collection
    const lastTransaction = await Transaction.findOne().sort({ orderId: -1 });
    const nextOrderId = (lastTransaction?.orderId || 0) + 1;

    // Create a new transaction with the next orderId
    const newTransaction = new Transaction({
      orderId: nextOrderId,
      items,
      subtotal,
      total,
      date,
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

// GET /api/transactions/:orderId - Get a specific transaction by orderId
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const transaction = await Transaction.findOne({ orderId: parseInt(orderId, 10) });
    if (!transaction) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(transaction);
  } catch (err) {
    console.error("Error fetching transaction:", err);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
});

module.exports = router;
