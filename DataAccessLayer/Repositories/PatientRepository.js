const Patient = require("../Models/Patient");

const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

module.exports = {
  createPatient,
};