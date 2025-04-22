const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("Drink", drinkSchema, "drinks");
