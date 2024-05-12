// Importing necessary schemas
const addJobSchema = require("../../models/manageJob/jobSchema");
const countSchema = require("../../models/manageJob/countSchema");

// Middleware to add a new job
const addJobPost = async (req, res, next) => {
  try {
    // Log the incoming request body
    console.log(req.body);
    
    // Save the new job
    const add = await new addJobSchema(req.body).save();

    // Find the current count document
    let countDoc = await countSchema.findOne();

    if (countDoc) {
      // If the count document exists, increment the count
      countDoc.addCount += 1;
    } else {
      // If the count document doesn't exist, create a new one with the count set to 1
      countDoc = new countSchema({ addCount: 1 });
    }

    // Save the updated count document
    await countDoc.save();

    // Send success response
    res.send({ res: "successful..!" });
  } catch (error) {
    // Log and send error response if any error occurs
    console.error("Error creating job:", error);
    res.status(500).send({ error: "Failed to create job" });
  }
};

// Middleware to delete a job
const addJobDelete = async (req, res, next) => {
  try {
    // Delete the job
    const job = await addJobSchema.deleteOne({ _id: req.params.id });
    if (job.acknowledged) {
      // If job is deleted successfully, fetch all remaining jobs and send as response
      let view = await addJobSchema.find();
      res.send(view);
    } else {
      // If job is not found, send appropriate message
      res.send({ message: "Record Not Found" });
    }
  } catch (error) {
    // Log and send error response if any error occurs
    console.error("Error deleting job:", error);
    res.status(500).send({ error: "Failed to delete job" });
  }
};

// Middleware to update a job
const addJobPut = async (req, res) => {
  try {
    // Update the job data
    let data = await addJobSchema.findOneAndUpdate(
      { _id: req.params.id }, // Query condition based on the document's _id field
      { $set: req.body }, // Update object wrapped in $set to update specific fields
      { new: true } // Option to return the updated document
    );

    // Find the current count document
    let countDoc = await countSchema.findOne();

    if (countDoc) {
      // If the count document exists, increment the count
      countDoc.updateCount += 1;
    } else {
      // If the count document doesn't exist, create a new one with the count set to 1
      countDoc = new countSchema({ updateCount: 1 });
    }

    // Save the updated count document
    await countDoc.save();

    // Send updated job data as response
    res.send(data);
  } catch (error) {
    // Log and send error response if any error occurs
    console.error("Error updating job:", error);
    res.status(500).send({ error: "Failed to update job" });
  }
};

// Middleware to get all jobs
const addJobGet = async (req, res, next) => {
  try {
    // Fetch all jobs and send as response
    let view = await addJobSchema.find();
    res.send(view);
  } catch (error) {
    // Log and send error response if any error occurs
    console.error("Error retrieving jobs:", error);
    res.status(500).send({ error: "Failed to retrieve jobs" });
  }
};

// Middleware to get count of documents
const addCountGet = async (req, res, next) => {
  try {
    // Retrieve all documents from the countSchema collection
    const countDocs = await countSchema.find();

    // Send the count documents as a response
    res.send(countDocs);
  } catch (error) {
    // Log and send error response if any error occurs
    console.error("Error retrieving count:", error);
    res.status(500).send({ error: "Failed to retrieve count" });
  }
};

// Exporting middleware functions
module.exports = { addJobPost, addJobDelete, addJobPut, addJobGet, addCountGet };
