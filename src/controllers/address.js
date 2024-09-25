const addressService = require('../services/address');

// Create a new Address
exports.create = async (req, res) => {
  try {
    const newAddress = await addressService.createAddress(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Addresses
exports.getAll = async (req, res) => {
  try {
    const addresses = await addressService.getAllAddresses();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an Address by ID
exports.getById = async (req, res) => {
  try {
    const address = await addressService.getAddressById(req.params.id);
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an Address by ID
exports.update = async (req, res) => {
  try {
    const updatedAddress = await addressService.updateAddress(req.params.id, req.body);
    if (updatedAddress) {
      res.json(updatedAddress);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an Address by ID
exports.delete = async (req, res) => {
  try {
    const deletedAddress = await addressService.deleteAddress(req.params.id);
    if (deletedAddress) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
