const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  villageId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  village: {
    type: String,
    required: true,
  },
  postal_code_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostalCode', // Reference to the PostalCode collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Village', villageSchema);
