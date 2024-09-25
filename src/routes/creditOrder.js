// routes/creditOrderRoutes.js
const express = require('express');
const router = express.Router();
const creditOrderController = require('../controllers/creditOrder');

// Create a new credit order
router.post('/credit-orders', creditOrderController.createCreditOrder);

// Get all credit orders
router.get('/credit-orders', creditOrderController.getAllCreditOrders);

// Get credit order by ID
router.get('/credit-orders/:id', creditOrderController.getCreditOrderById);

// Update a credit order by ID
router.patch('/credit-orders/:id', creditOrderController.updateCreditOrderById);

// Delete a credit order by ID
router.delete('/credit-orders/:id', creditOrderController.deleteCreditOrderById);

module.exports = router;
