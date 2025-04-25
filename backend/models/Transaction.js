const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  snackIds: { type: Array, required: false },
  drinkIds: { type: Array, required: false },
  address: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);
