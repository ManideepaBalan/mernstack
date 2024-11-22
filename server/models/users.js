const mongoose = require('mongoose');

// Define the schema for the Project model
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
 
});

// Create and export the Project model
module.exports = mongoose.model('users', UserSchema);
