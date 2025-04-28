const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true }, // Order number
  subtotal: { type: Number, required: true }, // Subtotal before tax
  total: { type: Number, required: true }, // Total after tax
  items: [
    {
      id: { type: String, required: true }, // Item ID
      name: { type: String, required: true }, // Item name
      quantity: { type: Number, required: true }, // Quantity of the item
      price: { type: Number, required: true }, // Cost per item
      image: { type: String, required: true }, // Image link for the item
    },
  ],
  date: { type: String, required: true }, // Date of the transaction
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);
