const mongoose = require('mongoose');

// Define the schema for the Project model
const PortfolioSchema = new mongoose.Schema({
  portfolioname: {
    type: String,
    required: true
  },
  portfoliolink: {
    type: String,
    required: true
  },
  portfoliodescription: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    //required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Specify ObjectId type
    ref: 'Users', // Reference the User model
    required: true, // Optional: make it a required field
  },
 
});

// Create and export the Project model
module.exports = mongoose.model('portfolios', PortfolioSchema);
