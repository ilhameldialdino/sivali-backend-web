const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shift');

// Create a new Shift
router.post('/', shiftController.create);

// Get all Shifts
router.get('/', shiftController.getAll);

// Get a Shift by ID
router.get('/:id', shiftController.getById);

// Update a Shift by ID
router.put('/:id', shiftController.update);

// Delete a Shift by ID
router.delete('/:id', shiftController.delete);

module.exports = router;
