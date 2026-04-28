const Doctor = require("../Models/Doctor");
const UserRepository = require("./UserRepository");

const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

const createDoctorWithUser = async (doctorData, userData) => {
  const user = await UserRepository.createUser(userData);
  doctorData.user = user._id;
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

const updateDoctor = async (doctorId, doctorData ,userData) => {
  
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }
  await UserRepository.updateUser(doctor.user, userData);

  return await Doctor.findByIdAndUpdate(doctorId, doctorData, {new: true,}).populate("user");

};

const deleteDoctor = async (doctorId) => {

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }
  await UserRepository.deleteUser(doctor.user);

  return await Doctor.findByIdAndDelete(doctorId);
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