// Import  module
const mongoose = require("mongoose");

// Disable pluralization 
mongoose.pluralize(null);

// Define the schema adding a job
const addJobSchema = new mongoose.Schema({
  title: String,    // Title of the job
  content: String,  // Content of the job
  status: String,   // Status of the job
});

// export the Job model 
module.exports = mongoose.model("Job", addJobSchema);
