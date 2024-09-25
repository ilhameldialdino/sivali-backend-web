const attendanceTrailService = require('../services/attendanceTrail');

// Create a new AttendanceTrail
exports.create = async (req, res) => {
  try {
    const newAttendanceTrail = await attendanceTrailService.createAttendanceTrail(req.body);
    res.status(201).json(newAttendanceTrail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all AttendanceTrails
exports.getAll = async (req, res) => {
  try {
    const attendanceTrails = await attendanceTrailService.getAllAttendanceTrails();
    res.json(attendanceTrails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an AttendanceTrail by ID
exports.getById = async (req, res) => {
  try {
    const attendanceTrail = await attendanceTrailService.getAttendanceTrailById(req.params.id);
    if (attendanceTrail) {
      res.json(attendanceTrail);
    } else {
      res.status(404).json({ error: 'Attendance Trail not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an AttendanceTrail by ID
exports.update = async (req, res) => {
  try {
    const updatedAttendanceTrail = await attendanceTrailService.updateAttendanceTrail(req.params.id, req.body);
    if (updatedAttendanceTrail) {
      res.json(updatedAttendanceTrail);
    } else {
      res.status(404).json({ error: 'Attendance Trail not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an AttendanceTrail by ID
exports.delete = async (req, res) => {
  try {
    const deletedAttendanceTrail = await attendanceTrailService.deleteAttendanceTrail(req.params.id);
    if (deletedAttendanceTrail) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Attendance Trail not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
