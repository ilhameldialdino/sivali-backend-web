const picService = require('../services/pic');

// Create a new PIC
exports.create = async (req, res) => {
  try {
    const newPic = await picService.createPic(req.body);
    res.status(201).json(newPic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all PICs
exports.getAll = async (req, res) => {
  try {
    const pics = await picService.getAllPics();
    res.json(pics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a PIC by ID
exports.getById = async (req, res) => {
  try {
    const pic = await picService.getPicById(req.params.id);
    if (pic) {
      res.json(pic);
    } else {
      res.status(404).json({ error: 'PIC not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a PIC by ID
exports.update = async (req, res) => {
  try {
    const updatedPic = await picService.updatePic(req.params.id, req.body);
    if (updatedPic) {
      res.json(updatedPic);
    } else {
      res.status(404).json({ error: 'PIC not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a PIC by ID
exports.delete = async (req, res) => {
  try {
    const deletedPic = await picService.deletePic(req.params.id);
    if (deletedPic) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'PIC not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
