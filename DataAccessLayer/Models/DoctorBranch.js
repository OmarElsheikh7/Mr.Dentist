const mongoose = require("mongoose");

const doctorBranchSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClinicBranch",
    required: true
  }
});

module.exports = mongoose.model("DoctorBranch", doctorBranchSchema);