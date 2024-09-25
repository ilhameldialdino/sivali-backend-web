const express = require('express');
const router = express.Router();
const paymentServiceInstitutionController = require('../controllers/paymentServiceInstitution');

// Create a new PaymentServiceInstitution
router.post('/', paymentServiceInstitutionController.create);

// Get all PaymentServiceInstitutions
router.get('/', paymentServiceInstitutionController.getAll);

// Get a PaymentServiceInstitution by ID
router.get('/:id', paymentServiceInstitutionController.getById);

// Update a PaymentServiceInstitution by ID
router.put('/:id', paymentServiceInstitutionController.update);

// Delete a PaymentServiceInstitution by ID
router.delete('/:id', paymentServiceInstitutionController.delete);

module.exports = router;
