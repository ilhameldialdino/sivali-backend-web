// controllers/creditOrderController.js
const CreditOrder = require('../models/creditOrder');

// Create a new credit order
exports.createCreditOrder = async (req, res) => {
  try {
    const creditOrder = new CreditOrder(req.body);
    await creditOrder.save();
    res.status(201).send(creditOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all credit orders
exports.getAllCreditOrders = async (req, res) => {
  try {
    const creditOrders = await CreditOrder.find({});
    res.status(200).send(creditOrders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get credit order by ID
exports.getCreditOrderById = async (req, res) => {
  try {
    const creditOrder = await CreditOrder.findOne({ orderId: req.params.id });
    if (!creditOrder) {
      return res.status(404).send();
    }
    res.status(200).send(creditOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a credit order by ID
exports.updateCreditOrderById = async (req, res) => {
  try {
    const creditOrder = await CreditOrder.findOneAndUpdate(
      { orderId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!creditOrder) {
      return res.status(404).send();
    }
    res.status(200).send(creditOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a credit order by ID
exports.deleteCreditOrderById = async (req, res) => {
  try {
    const creditOrder = await CreditOrder.findOneAndDelete({ orderId: req.params.id });
    if (!creditOrder) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Credit order deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
