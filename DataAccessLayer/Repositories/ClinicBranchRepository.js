const ClinicBranch = require('../Models/ClinicBranch');

const createClinicBranch = async (clinicBranchData) => {
  const clinicBranch = new ClinicBranch(clinicBranchData);
  return await clinicBranch.save();
};

const updateClinicBranch = async (branchId, clinicBranchData) => {
  return await ClinicBranch.findByIdAndUpdate(branchId, clinicBranchData, { new: true });
};

const deleteClinicBranch = async (branchId) => {
  return await ClinicBranch.findByIdAndDelete(branchId);
};

const getAllClinicBranches = async () => {
  return await ClinicBranch.find();
};

const getClinicBranchById = async (branchId) => {
  return await ClinicBranch.findById(branchId);
};

module.exports = {
  createClinicBranch,
  getAllClinicBranches,
  getClinicBranchById,
  updateClinicBranch,
  deleteClinicBranch
};