// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  job_name: { type: String, required: true },
  job_description: { type: String, required: true },
  shiftId: { type: String, required: true } // Assuming this references another collection
});

module.exports = mongoose.model('Employee', EmployeeSchema);
