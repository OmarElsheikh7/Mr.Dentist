const branchRepository = require('../../DataAccessLayer/Repositories/ClinicBranchRepository');

const createClinicBranch = async (req, res) => {
  try {
    const clinicBranchData = {
      address: req.body.address,
      phoneNumber: req.body.phone,
    };
    const clinicBranch = await branchRepository.createClinicBranch(clinicBranchData);
    res.status(201).json({ message: "Clinic branch created successfully", data: clinicBranch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllClinicBranches = async (req, res) => {
  try {
    const branches = await branchRepository.getAllClinicBranches();
    res.status(200).json({ message: "Clinic branches retrieved successfully", data: branches });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClinicBranchById = async (req, res) => {
  try {
    const branch = await branchRepository.getClinicBranchById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Clinic branch not found" });
    }
    res.status(200).json({ message: "Clinic branch retrieved successfully", data: branch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createClinicBranch,
  getAllClinicBranches,
  getClinicBranchById,
};