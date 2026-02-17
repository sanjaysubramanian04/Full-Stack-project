require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express(); // 1. INITIALIZE FIRST

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// 2. POINT TO "public" FOLDER (Your folder in the screenshot)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', authRoutes);

// 3. ROOT ROUTE (Must be after 'app' is defined)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));