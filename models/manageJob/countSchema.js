// Import  module
const mongoose = require("mongoose");

// Disable pluralization 
mongoose.pluralize(null);

// Define the schema for count
const countSchema = new mongoose.Schema({
  addCount: {
    type: Number,
    default: 0 // Default value for addCount field is 0
  },
  updateCount: {
    type: Number,
    default: 0 // Default value for updateCount field is 0
  }
});

// export the Count model 
module.exports = mongoose.model("Count", countSchema);
