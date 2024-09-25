const villageService = require('../services/village');

// Create a new Village
exports.create = async (req, res) => {
  try {
    const newVillage = await villageService.createVillage(req.body);
    res.status(201).json(newVillage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Villages
exports.getAll = async (req, res) => {
  try {
    const villages = await villageService.getAllVillages();
    res.json(villages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Village by ID
exports.getById = async (req, res) => {
  try {
    const village = await villageService.getVillageById(req.params.id);
    if (village) {
      res.json(village);
    } else {
      res.status(404).json({ error: 'Village not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Village by ID
exports.update = async (req, res) => {
  try {
    const updatedVillage = await villageService.updateVillage(req.params.id, req.body);
    if (updatedVillage) {
      res.json(updatedVillage);
    } else {
      res.status(404).json({ error: 'Village not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Village by ID
exports.delete = async (req, res) => {
  try {
    const deletedVillage = await villageService.deleteVillage(req.params.id);
    if (deletedVillage) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Village not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
