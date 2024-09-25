const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  city: {
    type: String,
    required: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District', // Reference to the District collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
