const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shift_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  shift_in: {
    type: Date, // Date and time of shift start
    required: true,
  },
  shift_out: {
    type: Date, // Date and time of shift end
    required: true,
  },
  attendance_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendance', // Reference to the Attendance collection
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);
