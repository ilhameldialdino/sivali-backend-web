// app.js
const express = require('express');
require('dotenv').config({ path: 'config.env' });  // Load environment variables from config.env
const pool = require('./db');  // PostgreSQL pool from db.js

const app = express();

// Middleware
app.use(express.json());
// Route Definitions
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/company-partner', require('./routes/companyPartner'));
app.use('/api/jobs', require('./routes/job'));
app.use('/api/job-categories', require('./routes/jobCategory'));
app.use('/api/job-titles', require('./routes/jobTitle'));
app.use('/api/job-specializations', require('./routes/jobSpecialization'));
app.use('/api/shifts', require('./routes/shift'));
app.use('/api/pics', require('./routes/pic'));
app.use('/api/cities', require('./routes/city'));
app.use('/api/districts', require('./routes/district'));
app.use('/api/villages', require('./routes/village'));
app.use('/api/addresses', require('./routes/address'));
app.use('/api/employee', require('./routes/employee'));
//app.use('/api/attendance-trail', require('./routes/attendanceTrail'));
app.use('/api/company-profile', require('./routes/companyProfile'));
app.use('/api/payment-service-institution', require('./routes/paymentServiceInstitution'));
app.use('/api/order-package', require('./routes/orderPackage'));
app.use('/api/package', require('./routes/package'));
app.use('/api/part-time-job-post', require('./routes/partTimeJobPost'));
app.use('/api/part-time-job-attendance', require('./routes/partTimeJobAttendance'));
app.use('/api/credit-order', require('./routes/creditOrder'));

// Handle database connection testing
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Connected to the database!', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
