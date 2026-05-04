const mongoose = require("mongoose");
const Doctor = require("../Models/Doctor");
const UserRepository = require("./UserRepository");

const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

const createDoctorWithUser = async (doctorData, userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await UserRepository.createUser(userData, { session });
    doctorData.user = user._id;

    const doctor = new Doctor(doctorData);
    await doctor.save({ session });

    await session.commitTransaction();

    return await doctor.populate("user");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateDoctor = async (doctorId, doctorData, userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await UserRepository.updateUser(doctor.user, userData, { session });

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId, 
      doctorData, 
      { new: true, session }
    ).populate("user");

    await session.commitTransaction();
    return await updatedDoctor;
    
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteDoctor = async (doctorId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await UserRepository.deleteUser(doctor.user, { session });
    await doctor.deleteOne({ session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const findDoctorByUserId = async (userId) => {
  return await Doctor.findOne({ user: userId }).populate("user");
};

const findDoctorById = async (doctorId) => {
  return await Doctor.findById(doctorId).populate("user");
};

const getAllDoctors = async () => {
  return await Doctor.find().populate("user");
};



module.exports = {
    createDoctor,
    findDoctorByUserId,
    findDoctorById,
    updateDoctor,
    getAllDoctors,
    deleteDoctor,
    createDoctorWithUser
};