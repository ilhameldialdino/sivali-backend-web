const express = require('express');
const router = express.Router();
const partTimeJobPostController = require('../controllers/partTimeJobPost');

// Create a new PartTimeJobPost
router.post('/', partTimeJobPostController.create);

// Get all PartTimeJobPosts
router.get('/', partTimeJobPostController.getAll);

// Get a PartTimeJobPost by ID
router.get('/:id', partTimeJobPostController.getById);

// Update a PartTimeJobPost by ID
router.put('/:id', partTimeJobPostController.update);

// Delete a PartTimeJobPost by ID
router.delete('/:id', partTimeJobPostController.delete);

module.exports = router;
