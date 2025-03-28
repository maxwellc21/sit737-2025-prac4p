// app.js
const express = require('express');
const morgan = require('morgan');
const logger = require('./services/loggerService');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

app.use(express.static('public'));

// Routes
app.use('/api', calculatorRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  logger.error(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(`500 - Server Error - ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  logger.info(`Calculator microservice running on port ${port}`);
});