const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  district: {
    type: String,
    required: true,
  },
  village_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Village', // Reference to the Village collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('District', districtSchema);
