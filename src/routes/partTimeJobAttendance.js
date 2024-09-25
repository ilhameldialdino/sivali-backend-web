const express = require('express');
const router = express.Router();
const partTimeJobAttendanceController = require('../controllers/partTimeJobAttendance');

// Create a new PartTimeJobAttendance
router.post('/', partTimeJobAttendanceController.create);

// Get all PartTimeJobAttendances
router.get('/', partTimeJobAttendanceController.getAll);

// Get a PartTimeJobAttendance by ID
router.get('/:id', partTimeJobAttendanceController.getById);

// Update a PartTimeJobAttendance by ID
router.put('/:id', partTimeJobAttendanceController.update);

// Delete a PartTimeJobAttendance by ID
router.delete('/:id', partTimeJobAttendanceController.delete);

module.exports = router;
