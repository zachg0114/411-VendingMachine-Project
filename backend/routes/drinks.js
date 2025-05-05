const express = require("express");
const router = express.Router();
const Drink = require("../models/Drink");

router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find();
    console.log("Fetched drinks:", drinks);
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drinks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return res.status(404).json({ message: "Drink not found" });
    }
    res.status(200).json(drink);
  } catch (err) {
    console.error("Error fetching drink:", err);
    res.status(500).json({ message: "Failed to fetch drink" });
  }
});

module.exports = router;
