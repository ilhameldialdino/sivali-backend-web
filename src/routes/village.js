const express = require('express');
const router = express.Router();
const villageController = require('../controllers/village');

// Create a new Village
router.post('/', villageController.create);

// Get all Villages
router.get('/', villageController.getAll);

// Get a Village by ID
router.get('/:id', villageController.getById);

// Update a Village by ID
router.put('/:id', villageController.update);

// Delete a Village by ID
router.delete('/:id', villageController.delete);

module.exports = router;
