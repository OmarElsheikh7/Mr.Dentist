const ClinicBranch = require('../Models/ClinicBranch');

const createClinicBranch = async (clinicBranchData) => {
  const clinicBranch = new ClinicBranch(clinicBranchData);
  return await clinicBranch.save();
};

module.exports = {
  createClinicBranch,
};