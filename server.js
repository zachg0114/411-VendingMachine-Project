// === BACKEND API ROUTES WITH EXPRESS ===
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Mongoose Schema & Model
const drinkSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
});

const Drink = mongoose.model('Drink', drinkSchema);

// GET /api/drinks - Get all available drinks
app.get('/api/drinks', async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve drinks.', error });
  }
});

// POST /api/purchase - Simulate a purchase
app.post('/api/purchase', async (req, res) => {
  const { drinkId } = req.body;

  try {
    const drink = await Drink.findById(drinkId);
    if (!drink) return res.status(404).json({ message: 'Drink not found.' });

    if (drink.stock > 0) {
      drink.stock -= 1;
      await drink.save();
      res.json({ message: `Enjoy your ${drink.name}!` });
    } else {
      res.status(400).json({ message: 'Out of stock!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing purchase.', error });
  }
});

// POST /api/combo - Recommend a flavor combo
app.post('/api/combo', (req, res) => {
  const { drinkA, drinkB } = req.body;

  if (!drinkA || !drinkB) {
    return res.status(400).json({ message: 'Both drinks must be selected.' });
  }

  if (drinkA === drinkB) {
    return res.json({ message: `Two ${drinkA}s? Bold move! It's a flavor overload.` });
  }

  const creativeCombos = [
    `Mixing ${drinkA} and ${drinkB} brings a blast of fizzy goodness! 💥`,
    `${drinkA} meets ${drinkB} — a match made in refreshment heaven. 🌈`,
    `Try a chilled ${drinkA}-${drinkB} fusion for a new twist! 🧊`,
    `The bold of ${drinkA} + the citrus of ${drinkB} = instant energy. ⚡`,
    `You’ve just created the secret menu item of the future. 🍹`,
  ];

  const message = creativeCombos[Math.floor(Math.random() * creativeCombos.length)];
  res.json({ message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
