const express = require("express");
const router = express.Router();
const Drink = require("../models/Drink");

router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drinks" });
  }
});

module.exports = router;
