const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ensure you have MONGO_URI in your .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;