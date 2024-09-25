const express = require('express');
const router = express.Router();
const provinceController = require('../controllers/province');

// Create a new Province
router.post('/', provinceController.create);

// Get all Provinces
router.get('/', provinceController.getAll);

// Get a Province by ID
router.get('/:id', provinceController.getById);

// Update a Province by ID
router.put('/:id', provinceController.update);

// Delete a Province by ID
router.delete('/:id', provinceController.delete);

module.exports = router;
