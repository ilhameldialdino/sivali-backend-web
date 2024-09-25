const jobTitleService = require('../services/jobTitle');

// Create a new JobTitle
exports.create = async (req, res) => {
  try {
    const newJobTitle = await jobTitleService.createJobTitle(req.body);
    res.status(201).json(newJobTitle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all JobTitles
exports.getAll = async (req, res) => {
  try {
    const jobTitles = await jobTitleService.getAllJobTitles();
    res.json(jobTitles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a JobTitle by ID
exports.getById = async (req, res) => {
  try {
    const jobTitle = await jobTitleService.getJobTitleById(req.params.id);
    if (jobTitle) {
      res.json(jobTitle);
    } else {
      res.status(404).json({ error: 'Job Title not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a JobTitle by ID
exports.update = async (req, res) => {
  try {
    const updatedJobTitle = await jobTitleService.updateJobTitle(req.params.id, req.body);
    if (updatedJobTitle) {
      res.json(updatedJobTitle);
    } else {
      res.status(404).json({ error: 'Job Title not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a JobTitle by ID
exports.delete = async (req, res) => {
  try {
    const deletedJobTitle = await jobTitleService.deleteJobTitle(req.params.id);
    if (deletedJobTitle) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Job Title not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
