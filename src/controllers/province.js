const provinceService = require('../services/province');

// Create a new Province
exports.create = async (req, res) => {
  try {
    const newProvince = await provinceService.createProvince(req.body);
    res.status(201).json(newProvince);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Provinces
exports.getAll = async (req, res) => {
  try {
    const provinces = await provinceService.getAllProvinces();
    res.json(provinces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Province by ID
exports.getById = async (req, res) => {
  try {
    const province = await provinceService.getProvinceById(req.params.id);
    if (province) {
      res.json(province);
    } else {
      res.status(404).json({ error: 'Province not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Province by ID
exports.update = async (req, res) => {
  try {
    const updatedProvince = await provinceService.updateProvince(req.params.id, req.body);
    if (updatedProvince) {
      res.json(updatedProvince);
    } else {
      res.status(404).json({ error: 'Province not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Province by ID
exports.delete = async (req, res) => {
  try {
    const deletedProvince = await provinceService.deleteProvince(req.params.id);
    if (deletedProvince) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Province not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
