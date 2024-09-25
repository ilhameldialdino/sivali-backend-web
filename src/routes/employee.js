// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

// Create a new employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Get employee by ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Update an employee by ID
router.patch('/employees/:id', employeeController.updateEmployeeById);

// Delete an employee by ID
router.delete('/employees/:id', employeeController.deleteEmployeeById);

module.exports = router;
