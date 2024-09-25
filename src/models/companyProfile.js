// models/CompanyProfile.js
const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_photo: { type: String, required: true },
  company_background_photo: { type: String, required: true },
  company_address: { type: String, required: true },
  company_email: { type: String, required: true },
  company_phone_number: { type: String, required: true }
});

module.exports = mongoose.model('CompanyProfile', CompanyProfileSchema);
