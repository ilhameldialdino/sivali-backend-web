const jobCategoryService = require('../services/jobCategory');

// Create a new JobCategory
exports.create = async (req, res) => {
  try {
    const newJobCategory = await jobCategoryService.createJobCategory(req.body);
    res.status(201).json(newJobCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all JobCategories
exports.getAll = async (req, res) => {
  try {
    const jobCategories = await jobCategoryService.getAllJobCategories();
    res.json(jobCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a JobCategory by ID
exports.getById = async (req, res) => {
  try {
    const jobCategory = await jobCategoryService.getJobCategoryById(req.params.id);
    if (jobCategory) {
      res.json(jobCategory);
    } else {
      res.status(404).json({ error: 'Job Category not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a JobCategory by ID
exports.update = async (req, res) => {
  try {
    const updatedJobCategory = await jobCategoryService.updateJobCategory(req.params.id, req.body);
    if (updatedJobCategory) {
      res.json(updatedJobCategory);
    } else {
      res.status(404).json({ error: 'Job Category not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a JobCategory by ID
exports.delete = async (req, res) => {
  try {
    const deletedJobCategory = await jobCategoryService.deleteJobCategory(req.params.id);
    if (deletedJobCategory) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Job Category not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
