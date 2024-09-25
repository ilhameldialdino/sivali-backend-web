const paymentServiceInstitutionService = require('../services/paymentServiceInstitution');

// Create a new PaymentServiceInstitution
exports.create = async (req, res) => {
  try {
    const newPaymentServiceInstitution = await paymentServiceInstitutionService.createPaymentServiceInstitution(req.body);
    res.status(201).json(newPaymentServiceInstitution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all PaymentServiceInstitutions
exports.getAll = async (req, res) => {
  try {
    const institutions = await paymentServiceInstitutionService.getAllPaymentServiceInstitutions();
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a PaymentServiceInstitution by ID
exports.getById = async (req, res) => {
  try {
    const institution = await paymentServiceInstitutionService.getPaymentServiceInstitutionById(req.params.id);
    if (institution) {
      res.json(institution);
    } else {
      res.status(404).json({ error: 'Payment Service Institution not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a PaymentServiceInstitution by ID
exports.update = async (req, res) => {
  try {
    const updatedInstitution = await paymentServiceInstitutionService.updatePaymentServiceInstitution(req.params.id, req.body);
    if (updatedInstitution) {
      res.json(updatedInstitution);
    } else {
      res.status(404).json({ error: 'Payment Service Institution not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a PaymentServiceInstitution by ID
exports.delete = async (req, res) => {
  try {
    const deletedInstitution = await paymentServiceInstitutionService.deletePaymentServiceInstitution(req.params.id);
    if (deletedInstitution) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Payment Service Institution not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
