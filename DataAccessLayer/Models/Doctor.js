const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClinicBranch",
    required: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
  shifts: {
    type: [Number],
    enum: [0, 1, 2],
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  
});

module.exports = mongoose.model("Doctor", doctorSchema);
