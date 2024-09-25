const mongoose = require('mongoose');

const topUpTransactionSchema = new mongoose.Schema({
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  transaction_date: {
    type: Date,
    required: true,
  },
  transaction_amount: {
    type: Number,
    required: true,
  },
  transaction_source_account_number: {
    type: String,
    required: true,
  },
  transaction_destination_account_number: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('TopUpTransaction', topUpTransactionSchema);
