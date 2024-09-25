const mongoose = require('mongoose');

const jobSpecializationSchema = new mongoose.Schema({
  job_spcialization_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  job_spcialization: {
    type: String,
    required: true,
  },
  job_title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobTitle', // Reference to the JobTitle collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('JobSpecialization', jobSpecializationSchema);
