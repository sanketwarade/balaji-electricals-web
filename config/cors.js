const cors = require('cors');

// Define CORS options
const corsOptions = {
  origin: '*', // Allow all origins (you can restrict this in production)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Export CORS configuration
module.exports = cors(corsOptions);
