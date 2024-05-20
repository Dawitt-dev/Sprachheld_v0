const config = require('config');
const db = config.get('mongoURI');
const express = require('express');
//cdconst connectDB = require('./db'); // Import the function to connect to MongoDB
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
//connectDB();
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/protected', require('./routes/api/protected')); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));