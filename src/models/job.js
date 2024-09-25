const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  job_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobCategory', // Reference to the JobCategory collection
    required: true,
  },
  job_period: {
    type: String, // For example: 'full-time', 'part-time'
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_start_date: {
    type: Date,
    required: true,
  },
  job_end_date: {
    type: Date,
  },
  job_start_posting: {
    type: Date,
    required: true,
  },
  job_expired_posting: {
    type: Date,
    required: true,
  },
  job_salary: {
    type: Number,
    required: true,
  },
  pic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pic', // Reference to the PIC collection
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company collection
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('Job', jobSchema);
