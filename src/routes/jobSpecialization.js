const express = require('express');
const router = express.Router();
const jobSpecializationController = require('../controllers/jobSpecialization');

// Create a new JobSpecialization
router.post('/', jobSpecializationController.create);

// Get all JobSpecializations
router.get('/', jobSpecializationController.getAll);

// Get a JobSpecialization by ID
router.get('/:id', jobSpecializationController.getById);

// Update a JobSpecialization by ID
router.put('/:id', jobSpecializationController.update);

// Delete a JobSpecialization by ID
router.delete('/:id', jobSpecializationController.delete);

module.exports = router;
