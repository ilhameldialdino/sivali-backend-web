const express = require('express');
const router = express.Router();
const attendanceTrailController = require('../controllers/attendanceTrail');

// Create a new AttendanceTrail
router.post('/', attendanceTrailController.create);

// Get all AttendanceTrails
router.get('/', attendanceTrailController.getAll);

// Get an AttendanceTrail by ID
router.get('/:id', attendanceTrailController.getById);

// Update an AttendanceTrail by ID
router.put('/:id', attendanceTrailController.update);

// Delete an AttendanceTrail by ID
router.delete('/:id', attendanceTrailController.delete);

module.exports = router;
