// controllers/packageController.js
const Package = require('../models/package');

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).send(package);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.status(200).send(packages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findOne({ packageId: req.params.id });
    if (!package) {
      return res.status(404).send();
    }
    res.status(200).send(package);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a package by ID
exports.updatePackageById = async (req, res) => {
  try {
    const package = await Package.findOneAndUpdate(
      { packageId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!package) {
      return res.status(404).send();
    }
    res.status(200).send(package);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a package by ID
exports.deletePackageById = async (req, res) => {
  try {
    const package = await Package.findOneAndDelete({ packageId: req.params.id });
    if (!package) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
