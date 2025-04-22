const express = require("express");
const router = express.Router();
const Drink = require("../models/Drink");

router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find();
    console.log("Fetched drinks:", drinks); // Log fetched drinks
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drinks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const drink = await Drink.findOne({ id: req.params.id }); // using custom 'id' field
    if (!drink) {
      return res.status(404).json({ message: "Drink not found" });
    }
    res.json(drink);
  } catch (err) {
    console.error("Error fetching drink by custom id:", err);
    res.status(500).json({ message: "Failed to fetch drink by id" });
  }
});

module.exports = router;
