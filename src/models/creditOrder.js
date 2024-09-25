// models/CreditOrder.js
const mongoose = require('mongoose');

const CreditOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  payment_method: { type: String, required: true },
  payment_institutionId: { type: String, required: true },
  payment_date: { type: Date, required: true },
  payment_amount: { type: Number, required: true },
});

module.exports = mongoose.model('CreditOrder', CreditOrderSchema);
