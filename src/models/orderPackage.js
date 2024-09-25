// models/OrderPackage.js
const mongoose = require('mongoose');

const OrderPackageSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  packageId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('OrderPackage', OrderPackageSchema);
