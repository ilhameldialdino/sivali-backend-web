const express = require('express');
const router = express.Router();
const picController = require('../controllers/pic');

// Create a new PIC
router.post('/', picController.create);

// Get all PICs
router.get('/', picController.getAll);

// Get a PIC by ID
router.get('/:id', picController.getById);

// Update a PIC by ID
router.put('/:id', picController.update);

// Delete a PIC by ID
router.delete('/:id', picController.delete);

module.exports = router;
