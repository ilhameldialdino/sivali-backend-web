const educationLevelService = require('../services/educationLevel');

// Create a new EducationLevel
exports.create = async (req, res) => {
  try {
    const newEducationLevel = await educationLevelService.createEducationLevel(req.body);
    res.status(201).json(newEducationLevel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all EducationLevels
exports.getAll = async (req, res) => {
  try {
    const educationLevels = await educationLevelService.getAllEducationLevels();
    res.json(educationLevels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an EducationLevel by ID
exports.getById = async (req, res) => {
  try {
    const educationLevel = await educationLevelService.getEducationLevelById(req.params.id);
    if (educationLevel) {
      res.json(educationLevel);
    } else {
      res.status(404).json({ error: 'Education Level not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an EducationLevel by ID
exports.update = async (req, res) => {
  try {
    const updatedEducationLevel = await educationLevelService.updateEducationLevel(req.params.id, req.body);
    if (updatedEducationLevel) {
      res.json(updatedEducationLevel);
    } else {
      res.status(404).json({ error: 'Education Level not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an EducationLevel by ID
exports.delete = async (req, res) => {
  try {
    const deletedEducationLevel = await educationLevelService.deleteEducationLevel(req.params.id);
    if (deletedEducationLevel) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Education Level not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
