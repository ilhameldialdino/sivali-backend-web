const partTimeJobAttendanceService = require('../services/partTimeJobAttendance');

// Create a new PartTimeJobAttendance
exports.create = async (req, res) => {
  try {
    const newPartTimeJobAttendance = await partTimeJobAttendanceService.createPartTimeJobAttendance(req.body);
    res.status(201).json(newPartTimeJobAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all PartTimeJobAttendances
exports.getAll = async (req, res) => {
  try {
    const partTimeJobAttendances = await partTimeJobAttendanceService.getAllPartTimeJobAttendances();
    res.json(partTimeJobAttendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a PartTimeJobAttendance by ID
exports.getById = async (req, res) => {
  try {
    const partTimeJobAttendance = await partTimeJobAttendanceService.getPartTimeJobAttendanceById(req.params.id);
    if (partTimeJobAttendance) {
      res.json(partTimeJobAttendance);
    } else {
      res.status(404).json({ error: 'Part Time Job Attendance not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a PartTimeJobAttendance by ID
exports.update = async (req, res) => {
  try {
    const updatedPartTimeJobAttendance = await partTimeJobAttendanceService.updatePartTimeJobAttendance(req.params.id, req.body);
    if (updatedPartTimeJobAttendance) {
      res.json(updatedPartTimeJobAttendance);
    } else {
      res.status(404).json({ error: 'Part Time Job Attendance not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a PartTimeJobAttendance by ID
exports.delete = async (req, res) => {
  try {
    const deletedPartTimeJobAttendance = await partTimeJobAttendanceService.deletePartTimeJobAttendance(req.params.id);
    if (deletedPartTimeJobAttendance) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Part Time Job Attendance not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
