const shiftService = require('../services/shift');

// Create a new Shift
exports.create = async (req, res) => {
  try {
    const newShift = await shiftService.createShift(req.body);
    res.status(201).json(newShift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Shifts
exports.getAll = async (req, res) => {
  try {
    const shifts = await shiftService.getAllShifts();
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Shift by ID
exports.getById = async (req, res) => {
  try {
    const shift = await shiftService.getShiftById(req.params.id);
    if (shift) {
      res.json(shift);
    } else {
      res.status(404).json({ error: 'Shift not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Shift by ID
exports.update = async (req, res) => {
  try {
    const updatedShift = await shiftService.updateShift(req.params.id, req.body);
    if (updatedShift) {
      res.json(updatedShift);
    } else {
      res.status(404).json({ error: 'Shift not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Shift by ID
exports.delete = async (req, res) => {
  try {
    const deletedShift = await shiftService.deleteShift(req.params.id);
    if (deletedShift) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Shift not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
