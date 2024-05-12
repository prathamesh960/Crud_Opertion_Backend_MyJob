// Import express module
const express = require("express");

// Create a router instance
const router = express.Router();

// Import controller methods for managing job registration
const {
  addJobPost,    // Controller  adding a job
  addJobDelete,  // Controller  deleting a job
  addJobPut,     // Controller updating a job
  addJobGet,     // Controller  getting all jobs
  addCountGet    // Controller  getting count of jobs
} = require("../controllers/manageJob/jobRegister");

// Define routes managing job registration
router.post("/add-job", addJobPost);       // Route for adding a job
router.delete("/:id", addJobDelete);        // Route for deleting a job
router.put("/:id", addJobPut);              // Route for updating a job
router.get("/get-job", addJobGet);          // Route for getting all jobs
router.get("/get-count", addCountGet);      // Route for getting count of jobs

// Export the router
module.exports = router;
