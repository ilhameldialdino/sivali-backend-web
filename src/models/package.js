// models/Package.js
const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  packageId: { type: String, required: true, unique: true },
  package_name: { type: String, required: true },
  package_category: { type: String, required: true },
  package_price: { type: Number, required: true }
});

module.exports = mongoose.model('Package', PackageSchema);
