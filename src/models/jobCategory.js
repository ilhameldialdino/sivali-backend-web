const mongoose = require('mongoose');

const jobCategorySchema = new mongoose.Schema({
  job_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  job_category: {
    type: String,
    required: true,
  },
  job_title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobTitle', // Reference to the JobTitle collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('JobCategory', jobCategorySchema);
