const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city');

// Create a new City
router.post('/', cityController.create);

// Get all Cities
router.get('/', cityController.getAll);

// Get a City by ID
router.get('/:id', cityController.getById);

// Update a City by ID
router.put('/:id', cityController.update);

// Delete a City by ID
router.delete('/:id', cityController.delete);

module.exports = router;
