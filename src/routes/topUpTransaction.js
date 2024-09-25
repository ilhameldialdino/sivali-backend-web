const express = require('express');
const router = express.Router();
const topUpTransactionController = require('../controllers/topUpTransaction');

// Create a new TopUpTransaction
router.post('/', topUpTransactionController.create);

// Get all TopUpTransactions
router.get('/', topUpTransactionController.getAll);

// Get a TopUpTransaction by ID
router.get('/:id', topUpTransactionController.getById);

// Update a TopUpTransaction by ID
router.put('/:id', topUpTransactionController.update);

// Delete a TopUpTransaction by ID
router.delete('/:id', topUpTransactionController.delete);

module.exports = router;
