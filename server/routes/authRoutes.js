const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User Saved Successfully" });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// LOGIN - Updated to ensure navigation works
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ 
            email: req.body.email, 
            password: req.body.password 
        });

        if (user) {
            // Send the name back so localStorage.setItem('user_name', data.name) works
            res.status(200).json({ 
                name: user.name,
                message: "Login successful" 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
});

// FETCH ALL - Ensuring all fields for the table are included
router.get('/all-users', async (req, res) => {
    try {
        // Find all users but don't send their passwords
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Could not fetch users" });
    }
});

module.exports = router;