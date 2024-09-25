const jobService = require('../services/job');

// Create a new job
exports.create = async (req, res) => {
  try {
    const newJob = await jobService.createJob(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs
exports.getAll = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job by ID
exports.getById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job by ID
exports.update = async (req, res) => {
  try {
    const updatedJob = await jobService.updateJob(req.params.id, req.body);
    if (updatedJob) {
      res.json(updatedJob);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job by ID
exports.delete = async (req, res) => {
  try {
    const deletedJob = await jobService.deleteJob(req.params.id);
    if (deletedJob) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
