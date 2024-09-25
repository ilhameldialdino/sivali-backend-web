const jobSpecializationService = require('../services/jobSpecialization');

// Create a new JobSpecialization
exports.create = async (req, res) => {
  try {
    const newJobSpecialization = await jobSpecializationService.createJobSpecialization(req.body);
    res.status(201).json(newJobSpecialization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all JobSpecializations
exports.getAll = async (req, res) => {
  try {
    const jobSpecializations = await jobSpecializationService.getAllJobSpecializations();
    res.json(jobSpecializations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a JobSpecialization by ID
exports.getById = async (req, res) => {
  try {
    const jobSpecialization = await jobSpecializationService.getJobSpecializationById(req.params.id);
    if (jobSpecialization) {
      res.json(jobSpecialization);
    } else {
      res.status(404).json({ error: 'Job Specialization not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a JobSpecialization by ID
exports.update = async (req, res) => {
  try {
    const updatedJobSpecialization = await jobSpecializationService.updateJobSpecialization(req.params.id, req.body);
    if (updatedJobSpecialization) {
      res.json(updatedJobSpecialization);
    } else {
      res.status(404).json({ error: 'Job Specialization not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a JobSpecialization by ID
exports.delete = async (req, res) => {
  try {
    const deletedJobSpecialization = await jobSpecializationService.deleteJobSpecialization(req.params.id);
    if (deletedJobSpecialization) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Job Specialization not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
