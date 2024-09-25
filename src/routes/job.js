const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job');

// Create a new job
router.post('/', jobController.create);

// Get all jobs
router.get('/', jobController.getAll);

// Get a job by ID
router.get('/:id', jobController.getById);

// Update a job by ID
router.put('/:id', jobController.update);

// Delete a job by ID
router.delete('/:id', jobController.delete);

module.exports = router;
