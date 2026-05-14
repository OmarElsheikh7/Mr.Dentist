const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
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
    // //  //required: true,
    },
    
    totalCost: {
      type: Number,
      required: true,
      min: 0,
      default: 100,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    shiftId: {
      type: Number,
      required: true,
      enum: [0, 1, 2], // 0=Morning, 1=Afternoon, 2=Night
    },
    createdAt: {
  type: Date,
  default: Date.now,
},
    slotTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/, // "HH:MM"
    },
  },
 
);

appointmentSchema.index(
  { doctor: 1, appointmentDate: 1, shiftId: 1, slotTime: 1 },
  { unique: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);