const mongoose = require("mongoose");
const Patient = require("../Models/Patient");
const UserRepository = require("./UserRepository");

const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

const createPatientWithUser = async (patientData, userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try { 
    const user = await UserRepository.createUser(userData, { session });
    
    patientData.user = user._id;
    const patient = new Patient(patientData);
    await patient.save({ session });

    await session.commitTransaction();
    
    return await patient.populate("user");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updatePatient = async (patientId, patientData, userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const patient = await Patient.findById(patientId).session(session);
    if (!patient) throw new Error("Patient not found");

    await UserRepository.updateUser(patient.user, userData, { session });

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      patientData,
      { new: true, session }
    ).populate("user");

    await session.commitTransaction();

    return await updatedPatient;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deletePatient = async (patientId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const patient = await Patient.findById(patientId).session(session);
    if (!patient) throw new Error("Patient not found");

    await UserRepository.deleteUser(patient.user, { session });

    await patient.deleteOne({ session });

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
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
  createPatientWithUser,
  deletePatient
};