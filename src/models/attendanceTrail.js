const mongoose = require('mongoose');

const attendanceTrailSchema = new mongoose.Schema({
  attendance_trail_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  location_in: {
    type: String,
    required: true,
  },
  location_out: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AttendanceTrail', attendanceTrailSchema);
