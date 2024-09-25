// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package');

// Create a new package
router.post('/packages', packageController.createPackage);

// Get all packages
router.get('/packages', packageController.getAllPackages);

// Get package by ID
router.get('/packages/:id', packageController.getPackageById);

// Update a package by ID
router.patch('/packages/:id', packageController.updatePackageById);

// Delete a package by ID
router.delete('/packages/:id', packageController.deletePackageById);

module.exports = router;
