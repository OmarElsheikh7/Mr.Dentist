const Patient = require("../Models/Patient");
const UserRepository = require("./UserRepository");

const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

const updatePatient = async (patientId, patientData,userData) => {
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  await UserRepository.updateUser(patient.user, userData);

  await patient.updateOne(patientData, {new: true,}).populate("user");
  return patient.populate("user");

};

const deletePatient = async (patientId) => {
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  await UserRepository.deleteUser(patient.user);

  return await patient.deleteOne();
};

const findPatientByUserId = async (userId) => {
  return await Patient.findOne({ user: userId }).populate("user");
};

const findPatientById = async (patientId) => {
  return await Patient.findById(patientId).populate("user");
};

module.exports = {
  createPatient,
  findPatientByUserId,
  findPatientById,
  updatePatient,
  deletePatient
};