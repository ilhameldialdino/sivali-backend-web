const mongoose = require('mongoose');

const picSchema = new mongoose.Schema({
  pic_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  pic_name: {
    type: String,
    required: true,
  },
  pic_phone_number: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pic', picSchema);
