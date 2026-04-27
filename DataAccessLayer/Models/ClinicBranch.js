const mongoose = require("mongoose");

const clinicBranchSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ClinicBranch", clinicBranchSchema);