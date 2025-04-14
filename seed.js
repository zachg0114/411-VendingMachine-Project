// seed.js

const mongoose = require('mongoose');
require('dotenv').config();

const drinkSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
});

const Drink = mongoose.model('Drink', drinkSchema);

const sampleDrinks = [
  {
    name: 'Pepsi',
    description: 'Refreshing cola with a bold taste.',
    price: 1.50,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Pepsi_can_2020.jpg',
    stock: 20,
  },
  {
    name: 'Mountain Dew',
    description: 'Citrus-flavored soda with a high energy kick.',
    price: 1.75,
    image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Mountain_Dew_logo.png',
    stock: 15,
  },
  {
    name: 'Gatorade Cool Blue',
    description: 'Hydration with a cool blueberry flavor.',
    price: 2.00,
    image: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Gatorade_logo_2019.png',
    stock: 12,
  },
  {
    name: 'Aquafina Water',
    description: 'Purified bottled water for hydration.',
    price: 1.25,
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/Aquafina_logo.png',
    stock: 25,
  },
  {
    name: 'Tropicana Orange Juice',
    description: '100% orange juice, no pulp.',
    price: 2.50,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Tropicana_Products_logo.svg',
    stock: 10,
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Drink.deleteMany({});
  await Drink.insertMany(sampleDrinks);
  console.log('Sample drinks inserted!');
  mongoose.disconnect();
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
