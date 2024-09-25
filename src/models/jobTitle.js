const mongoose = require('mongoose');

const jobTitleSchema = new mongoose.Schema({
  job_title_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  job_spcialization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSpecialization', // Reference to the JobSpecialization collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('JobTitle', jobTitleSchema);
