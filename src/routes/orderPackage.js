// routes/orderPackageRoutes.js
const express = require('express');
const router = express.Router();
const orderPackageController = require('../controllers/orderPackage');

// Create a new order package
router.post('/order-packages', orderPackageController.createOrderPackage);

// Get all order packages
router.get('/order-packages', orderPackageController.getAllOrderPackages);

// Get order package by ID
router.get('/order-packages/:id', orderPackageController.getOrderPackageById);

// Update an order package by ID
router.patch('/order-packages/:id', orderPackageController.updateOrderPackageById);

// Delete an order package by ID
router.delete('/order-packages/:id', orderPackageController.deleteOrderPackageById);

module.exports = router;
