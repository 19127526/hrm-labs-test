const express = require('express');
const cors = require('cors');
const employeeRoutes = require('../routes/employee.route');
const leaveRequestRoutes = require('../routes/leaveRequest.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/leave', leaveRequestRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'HRM Backend API is running' });
});

module.exports = app;

