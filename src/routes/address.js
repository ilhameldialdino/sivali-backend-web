const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');

// Create a new Address
router.post('/', addressController.create);

// Get all Addresses
router.get('/', addressController.getAll);

// Get an Address by ID
router.get('/:id', addressController.getById);

// Update an Address by ID
router.put('/:id', addressController.update);

// Delete an Address by ID
router.delete('/:id', addressController.delete);

module.exports = router;
