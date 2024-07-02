const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = async () => {
  dotenv.config({ path: '.env.local' });
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;