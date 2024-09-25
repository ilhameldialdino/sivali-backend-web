const express = require('express');
const router = express.Router();
const jobCategoryController = require('../controllers/jobCategory');

// Create a new JobCategory
router.post('/', jobCategoryController.create);

// Get all JobCategories
router.get('/', jobCategoryController.getAll);

// Get a JobCategory by ID
router.get('/:id', jobCategoryController.getById);

// Update a JobCategory by ID
router.put('/:id', jobCategoryController.update);

// Delete a JobCategory by ID
router.delete('/:id', jobCategoryController.delete);

module.exports = router;
