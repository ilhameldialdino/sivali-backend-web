const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  province_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  province: {
    type: String,
    required: true,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City', // Reference to the City collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Province', provinceSchema);
