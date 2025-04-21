const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink');

router.get('/api/drinks', async (req, res) => {
  try {
    console.log('Fetching drinks from the database...');
    const drinks = await Drink.find();
    console.log('Drinks fetched successfully:', drinks);
    res.json(drinks);
  } catch (error) {
    console.error('Error fetching drinks:', error.message);
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
});

module.exports = router;
