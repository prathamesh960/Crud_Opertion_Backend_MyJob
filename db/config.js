const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/Assignment';

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove or comment out the unsupported option buffertimeoutms
  // buffertimeoutms: 5000,
};

// Connect to MongoDB
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose.connection;
