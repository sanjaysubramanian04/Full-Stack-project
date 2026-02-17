const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Employee', 'Teacher'], required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);