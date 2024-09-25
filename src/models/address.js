const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  postal_code_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  address: {
    type: String,
    required: true,
  },
  village_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Village', // Reference to the Village collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
