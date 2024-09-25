const partTimeJobPostService = require('../services/partTimeJobPost');

// Create a new PartTimeJobPost
exports.create = async (req, res) => {
  try {
    const newPartTimeJobPost = await partTimeJobPostService.createPartTimeJobPost(req.body);
    res.status(201).json(newPartTimeJobPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all PartTimeJobPosts
exports.getAll = async (req, res) => {
  try {
    const partTimeJobPosts = await partTimeJobPostService.getAllPartTimeJobPosts();
    res.json(partTimeJobPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a PartTimeJobPost by ID
exports.getById = async (req, res) => {
  try {
    const partTimeJobPost = await partTimeJobPostService.getPartTimeJobPostById(req.params.id);
    if (partTimeJobPost) {
      res.json(partTimeJobPost);
    } else {
      res.status(404).json({ error: 'Part Time Job Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a PartTimeJobPost by ID
exports.update = async (req, res) => {
  try {
    const updatedPartTimeJobPost = await partTimeJobPostService.updatePartTimeJobPost(req.params.id, req.body);
    if (updatedPartTimeJobPost) {
      res.json(updatedPartTimeJobPost);
    } else {
      res.status(404).json({ error: 'Part Time Job Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a PartTimeJobPost by ID
exports.delete = async (req, res) => {
  try {
    const deletedPartTimeJobPost = await partTimeJobPostService.deletePartTimeJobPost(req.params.id);
    if (deletedPartTimeJobPost) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Part Time Job Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
