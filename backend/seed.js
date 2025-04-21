require('dotenv').config();
const mongoose = require('mongoose');
const Drink = require('./models/Drink');

const seedData = [
  {
    name: 'Pepsi',
    description: 'A refreshing cola drink.',
    price: 1.5,
    image: 'https://via.placeholder.com/150?text=Pepsi',
  },
  {
    name: 'Mountain Dew',
    description: 'A citrus-flavored soda.',
    price: 1.75,
    image: 'https://via.placeholder.com/150?text=Mountain+Dew',
  },
  {
    name: 'Gatorade',
    description: 'A sports drink to keep you hydrated.',
    price: 2.0,
    image: 'https://via.placeholder.com/150?text=Gatorade',
  },
  {
    name: 'Aquafina',
    description: 'Pure and refreshing bottled water.',
    price: 1.0,
    image: 'https://via.placeholder.com/150?text=Aquafina',
  },
  {
    name: '7UP',
    description: 'A crisp and clean lemon-lime soda.',
    price: 1.5,
    image: 'https://via.placeholder.com/150?text=7UP',
  },
  {
    name: 'Lipton Iced Tea',
    description: 'A sweet and refreshing iced tea.',
    price: 1.8,
    image: 'https://via.placeholder.com/150?text=Lipton+Iced+Tea',
  },
];

const seedDatabase = async () => {
  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    console.log('Attempting to connect to database:', dbUri);
    await mongoose.connect(dbUri);
    console.log('✅ Database connection successful.');

    console.log('Clearing existing drinks...');
    await Drink.deleteMany({});
    console.log('✅ Existing drinks cleared.');

    console.log('Inserting seed data...');
    await Drink.insertMany(seedData);
    console.log('✅ Seed data inserted successfully.');

    mongoose.connection.close();
    console.log('✅ Database connection closed.');
  } catch (error) {
    console.error('❌ Error during seeding process:', error.message);
    mongoose.connection.close();
  }
};

seedDatabase();
