// models/CompanyPartner.js
const mongoose = require('mongoose');
const passwordService = require('../utils/hashAndComparePassword'); // Assuming the service file is here
const crypto = require('crypto');

const CompanySchema = new mongoose.Schema({
  company_id: { type: String, required: true, unique: true },
  company_password: { type: String, required: true },
  company_industry: { type: String, required: true },
  company_size: { type: Number, required: true },
  company_name: { type: String, required: true },
  company_photo: { type: String },
  company_address: { type: String, required: true },
  company_email: { type: String, required: true, unique: true },
  company_user_position: { type: String, required: true },
  company_phone_number: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
  verification_token: { type: String },
  verification_token_expires: { type: Date },
  reset_password_token: { type: String },
  reset_password_expires: { type: Date }
});

// Hash the password before saving the company
CompanySchema.pre('save', async function (next) {
  if (this.isModified('company_password') || this.isNew) {
    this.company_password = await passwordService.hashPassword(this.company_password);
  }
  next();
});

// Method to check if the entered password matches the hashed password
CompanySchema.methods.comparePassword = function (password) {
  return passwordService.comparePassword(password, this.company_password);
};

// Method to generate a verification token
CompanySchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.verification_token = token;
  this.verification_token_expires = Date.now() + 3600000; // 1 hour to expire
  return token;
};

// Method to generate a password reset token
CompanySchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.reset_password_token = token;
  this.reset_password_expires = Date.now() + 3600000; // 1 hour to expire
  return token;
};

module.exports = mongoose.model('CompanyPartner', CompanySchema);
