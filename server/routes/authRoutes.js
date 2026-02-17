const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ msg: "User Saved" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if(user) res.json({ name: user.name });
    else res.status(400).json({ msg: "Failed" });
});

// FETCH ALL
router.get('/all-users', async (req, res) => {
    const users = await User.find({}, '-password');
    res.json(users);
});

module.exports = router;