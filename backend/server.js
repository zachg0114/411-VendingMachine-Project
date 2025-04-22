const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Drink = require('./models/Drink'); // Import the Drink model
const Snack = require('./models/Snack'); // Import the Snack model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
	origin: 'http://localhost:3000', // Allow requests from the frontend
}));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Database connection error:', err));

// Routes
app.get('/api/drinks', async (req, res) => {
	try {
		console.log('Fetching drinks from the database...');
		const drinks = await Drink.find(); // Fetch all drinks from the database
		console.log('Drinks fetched successfully:', drinks);
		res.json(drinks);
	} catch (err) {
		console.error('Error fetching drinks:', err);
		res.status(500).json({ message: 'Failed to fetch drinks' });
	}
});

app.get('/api/snacks', async (req, res) => {
	try {
		const snacks = await Snack.find(); // Fetch all snacks from the database
		res.json(snacks);
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch snacks' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
