const express = require('express');

const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB Atlas
connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
