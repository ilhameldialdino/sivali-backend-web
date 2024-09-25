const mongoose = require('mongoose');

const paymentServiceInstitutionSchema = new mongoose.Schema({
  payment_institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  provider_name: {
    type: String,
    required: true,
  },
  provider_account_number: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PaymentServiceInstitution', paymentServiceInstitutionSchema);
