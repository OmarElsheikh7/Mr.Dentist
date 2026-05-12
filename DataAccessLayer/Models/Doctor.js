const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
  StartShift: {
    type: Number,
    required: true,
  },
  EndShift: {
    type: Number,
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