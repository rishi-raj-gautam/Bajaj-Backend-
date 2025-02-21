require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST /bfhl - Process input
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
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(400).json({ is_success: false, message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));