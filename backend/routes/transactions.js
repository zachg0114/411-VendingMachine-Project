const express = require("express");
const Snack = require("../models/Transaction"); // Import the Snack model

const router = express.Router();

// POST /api/transactions - Add a new transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body); // Create a new transaction from the request body
    const savedTransaction = await newTransaction.save(); // Save the snack to the database
    res.status(200).json(savedTransaction);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ message: "Failed to add new transaction" });
  }
});

module.exports = router;
