// controllers/orderPackageController.js
const OrderPackage = require('../models/orderPackage');

// Create a new order package
exports.createOrderPackage = async (req, res) => {
  try {
    const orderPackage = new OrderPackage(req.body);
    await orderPackage.save();
    res.status(201).send(orderPackage);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all order packages
exports.getAllOrderPackages = async (req, res) => {
  try {
    const orderPackages = await OrderPackage.find({});
    res.status(200).send(orderPackages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get order package by ID
exports.getOrderPackageById = async (req, res) => {
  try {
    const orderPackage = await OrderPackage.findOne({ orderId: req.params.id });
    if (!orderPackage) {
      return res.status(404).send();
    }
    res.status(200).send(orderPackage);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an order package by ID
exports.updateOrderPackageById = async (req, res) => {
  try {
    const orderPackage = await OrderPackage.findOneAndUpdate(
      { orderId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!orderPackage) {
      return res.status(404).send();
    }
    res.status(200).send(orderPackage);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an order package by ID
exports.deleteOrderPackageById = async (req, res) => {
  try {
    const orderPackage = await OrderPackage.findOneAndDelete({ orderId: req.params.id });
    if (!orderPackage) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Order package deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
