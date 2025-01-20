const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('./config/cors'); // Custom CORS config
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path'); // Required for serving static files

dotenv.config();

const rateLimiter = require('./middlewares/rateLimiter');
const db = require('./config/db'); // Database connection
const session = require('./config/session');

// Import routes
const quoteFormRoutes = require('./routes/quoteForm');
const solutionformRoutes = require('./routes/solutionform');
const EnquiryformRoutes = require('./routes/Enquiryform');

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors); // Custom CORS middleware
app.use(rateLimiter);

// Session setup
app.use(session);

// Serve static files (images, videos, etc.) from 'src/assets' folder
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Serve static files (HTML, CSS, etc.) from 'src/pages' folder
app.use('/pages', express.static(path.join(__dirname, 'src', 'pages')));

// Routes
app.use('/quote', quoteFormRoutes);
app.use('/solution', solutionformRoutes);
app.use('/enquiry', EnquiryformRoutes);

// 404 Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
