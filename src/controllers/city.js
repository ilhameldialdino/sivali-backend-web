const cityService = require('../services/city');

// Create a new City
exports.create = async (req, res) => {
  try {
    const newCity = await cityService.createCity(req.body);
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Cities
exports.getAll = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a City by ID
exports.getById = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a City by ID
exports.update = async (req, res) => {
  try {
    const updatedCity = await cityService.updateCity(req.params.id, req.body);
    if (updatedCity) {
      res.json(updatedCity);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a City by ID
exports.delete = async (req, res) => {
  try {
    const deletedCity = await cityService.deleteCity(req.params.id);
    if (deletedCity) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
