// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using mongoose.connect()
    await mongoose.connect('mongodb+srv://Dawitt-dev:wish1992@sprachheld.rjxlhah.mongodb.net/?retryWrites=true&w=majority&appName=SprachHeld', {   
    });
    // Log a success message if the connection is established
    console.log('MongoDB connected...');
  } catch (err) {
    // Log the error message if there is an issue connecting to the database
    console.error(err.message);
    // Exit the process with a failure code (1) to indicate that the script didn't run successfully
    process.exit(1);
  }
};

// Export the connectDB function to use it in other parts of the application
module.exports = connectDB;
