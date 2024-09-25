const express = require('express');
const router = express.Router();
const jobTitleController = require('../controllers/jobTitle');

// Create a new JobTitle
router.post('/', jobTitleController.create);

// Get all JobTitles
router.get('/', jobTitleController.getAll);

// Get a JobTitle by ID
router.get('/:id', jobTitleController.getById);

// Update a JobTitle by ID
router.put('/:id', jobTitleController.update);

// Delete a JobTitle by ID
router.delete('/:id', jobTitleController.delete);

module.exports = router;
