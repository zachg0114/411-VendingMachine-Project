const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Snack", snackSchema, "snacks");
