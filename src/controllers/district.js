const districtService = require('../services/district');

// Create a new District
exports.create = async (req, res) => {
  try {
    const newDistrict = await districtService.createDistrict(req.body);
    res.status(201).json(newDistrict);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Districts
exports.getAll = async (req, res) => {
  try {
    const districts = await districtService.getAllDistricts();
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a District by ID
exports.getById = async (req, res) => {
  try {
    const district = await districtService.getDistrictById(req.params.id);
    if (district) {
      res.json(district);
    } else {
      res.status(404).json({ error: 'District not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a District by ID
exports.update = async (req, res) => {
  try {
    const updatedDistrict = await districtService.updateDistrict(req.params.id, req.body);
    if (updatedDistrict) {
      res.json(updatedDistrict);
    } else {
      res.status(404).json({ error: 'District not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a District by ID
exports.delete = async (req, res) => {
  try {
    const deletedDistrict = await districtService.deleteDistrict(req.params.id);
    if (deletedDistrict) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'District not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
