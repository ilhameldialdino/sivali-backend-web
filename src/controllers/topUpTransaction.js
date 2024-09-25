const topUpTransactionService = require('../services/topUpTransaction');

// Create a new TopUpTransaction
exports.create = async (req, res) => {
  try {
    const newTopUpTransaction = await topUpTransactionService.createTopUpTransaction(req.body);
    res.status(201).json(newTopUpTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all TopUpTransactions
exports.getAll = async (req, res) => {
  try {
    const topUpTransactions = await topUpTransactionService.getAllTopUpTransactions();
    res.json(topUpTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a TopUpTransaction by ID
exports.getById = async (req, res) => {
  try {
    const topUpTransaction = await topUpTransactionService.getTopUpTransactionById(req.params.id);
    if (topUpTransaction) {
      res.json(topUpTransaction);
    } else {
      res.status(404).json({ error: 'Top Up Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a TopUpTransaction by ID
exports.update = async (req, res) => {
  try {
    const updatedTopUpTransaction = await topUpTransactionService.updateTopUpTransaction(req.params.id, req.body);
    if (updatedTopUpTransaction) {
      res.json(updatedTopUpTransaction);
    } else {
      res.status(404).json({ error: 'Top Up Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a TopUpTransaction by ID
exports.delete = async (req, res) => {
  try {
    const deletedTopUpTransaction = await topUpTransactionService.deleteTopUpTransaction(req.params.id);
    if (deletedTopUpTransaction) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Top Up Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
