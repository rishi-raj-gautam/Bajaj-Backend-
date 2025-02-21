require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) throw new Error('Invalid input format');

        let numbers = [], alphabets = [];
        data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (/^[A-Za-z]$/.test(item)) alphabets.push(item);
        });

        let highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

        res.status(200).json({
            is_success: true,
            user_id: process.env.USER_ID || "default_user",
            email: process.env.EMAIL || "default@xyz.com",
            roll_number: process.env.ROLL_NUMBER || "DEFAULT123",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(400).json({ is_success: false, message: error.message });
    }
});

// Export app as a serverless function for Vercel
module.exports = app;
