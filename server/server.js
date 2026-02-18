require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
// Vercel will pull this from your Environment Variables settings
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// API Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// SERVE STATIC FILES
// We use path.resolve to ensure Vercel finds the 'public' folder correctly
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Fallback to index.html for any non-API routes
app.get('*', (req, res) => {
    // If the request isn't an API call, serve the frontend
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(publicPath, 'index.html'));
    }
});

// For local testing
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
}

// Export for Vercel (CRUCIAL)
module.exports = app;