const Patient = require("../Models/Patient");

const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

const findPatientByUserId = async (userId) => {
  return await Patient.findOne({ user: userId }).populate("user");
};

module.exports = {
  createPatient,
  findPatientByUserId,
};