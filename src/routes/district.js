const express = require('express');
const router = express.Router();
const districtController = require('../controllers/district');

// Create a new District
router.post('/', districtController.create);

// Get all Districts
router.get('/', districtController.getAll);

// Get a District by ID
router.get('/:id', districtController.getById);

// Update a District by ID
router.put('/:id', districtController.update);

// Delete a District by ID
router.delete('/:id', districtController.delete);

module.exports = router;
