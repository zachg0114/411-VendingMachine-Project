const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  items: [
    {
      id: { type: String, required: true }, // Item ID
      name: { type: String, required: true }, // Item name
      quantity: { type: Number, required: true }, // Quantity of the item
      price: { type: Number, required: true }, // Cost per item
    },
  ],
  date: { type: String, required: true },
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);
