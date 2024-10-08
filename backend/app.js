const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://campusjunction.onrender.com' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});

app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
});
