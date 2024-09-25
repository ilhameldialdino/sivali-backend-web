const mongoose = require('mongoose');

const partTimeJobAttendanceSchema = new mongoose.Schema({
  attendance_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: Date,
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job collection
    required: true,
  },
  shift_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift', // Reference to the Shift collection
    required: true,
  },
  attendance_trail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttendanceTrail', // Reference to the AttendanceTrail collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PartTimeJobAttendance', partTimeJobAttendanceSchema);
