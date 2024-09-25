// models/PaymentServiceInstitution.js
const mongoose = require('mongoose');

const PaymentServiceInstitutionSchema = new mongoose.Schema({
  payment_institutionId: { type: String, required: true, unique: true },
  bank_provider_name: { type: String, required: true },
  bank_provider_account_number: { type: String, required: true }
});

module.exports = mongoose.model('PaymentServiceInstitution', PaymentServiceInstitutionSchema);
