const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClinicBranch",
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);