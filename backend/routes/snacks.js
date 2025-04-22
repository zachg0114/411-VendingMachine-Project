const express = require('express');
const Snack = require('../models/Snack'); // Import the Snack model

const router = express.Router();

// GET /api/snacks - Fetch all snacks
router.get('/', async (req, res) => {
  try {
    const snacks = await Snack.find(); // Fetch all snacks from the database
    console.log("Fetched snacks:", snacks); // Log fetched snacks
    res.json(snacks);
  } catch (err) {
    console.error('Error fetching snacks:', err);
    res.status(500).json({ message: 'Failed to fetch snacks' });
  }
});

// POST /api/snacks - Add a new snack
router.post('/', async (req, res) => {
  try {
    const newSnack = new Snack(req.body); // Create a new snack from the request body
    const savedSnack = await newSnack.save(); // Save the snack to the database
    res.status(201).json(savedSnack);
  } catch (err) {
    console.error('Error adding snack:', err);
    res.status(500).json({ message: 'Failed to add snack' });
  }
});

module.exports = router;
