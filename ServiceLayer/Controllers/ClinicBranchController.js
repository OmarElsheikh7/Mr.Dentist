const branchRepository = require('../../DataAccessLayer/Repositories/ClinicBranchRepository');

const createClinicBranch = async (req, res) => {
  try {
    const clinicBranchData = {
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phone,
    };
    const clinicBranch = await branchRepository.createClinicBranch(clinicBranchData);
    res.status(201).json({ message: "Clinic branch created successfully", data: clinicBranch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createClinicBranch,
};