const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

const authRoutes = require('./routes/auth');
const marketplaceRoutes = require('./routes/marketplace');
const cartRoutes = require('./routes/cart');
const categoryRoutes = require('./routes/categories');


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});

app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
});
