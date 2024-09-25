const express = require('express');
const router = express.Router();
const educationLevelController = require('../controllers/educationLevel');

// Create a new EducationLevel
router.post('/', educationLevelController.create);

// Get all EducationLevels
router.get('/', educationLevelController.getAll);

// Get an EducationLevel by ID
router.get('/:id', educationLevelController.getById);

// Update an EducationLevel by ID
router.put('/:id', educationLevelController.update);

// Delete an EducationLevel by ID
router.delete('/:id', educationLevelController.delete);

module.exports = router;
