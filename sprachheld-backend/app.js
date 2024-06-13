const config = require('config');
const db = config.get('mongoURI');
const express = require('express');
const connectDB = require('./db');
const mongoose = require('mongoose');
const c = require('config');
const app = express();
const cors = require('cors');
//const port = 5000;

// Connect to MongoDB
connectDB();
app.use(cors());
// Middleware
app.use(express.json({ extended: false }));
//app.use(cors({
//	origin: "https://159.89.7.100:3000",
  //  credentials: true,
//}));




// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/protected', require('./routes/api/protected'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/userExercises', require('./routes/userExercises'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port 5000`));
