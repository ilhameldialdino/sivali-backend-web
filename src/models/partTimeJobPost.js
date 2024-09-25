const mongoose = require('mongoose');

const partTimeJobPostSchema = new mongoose.Schema({
  part_time_jobId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company collection
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job collection
    required: true,
  },
  pic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pic', // Reference to the Pic collection
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address', // Reference to the Address collection
    required: true,
  },
  date_start_posting: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PartTimeJobPost', partTimeJobPostSchema);
