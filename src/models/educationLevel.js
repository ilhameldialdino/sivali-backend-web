const mongoose = require('mongoose');

const educationLevelSchema = new mongoose.Schema({
  education_level_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  education_level_name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('EducationLevel', educationLevelSchema);
