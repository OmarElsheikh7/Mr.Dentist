const mongoose = require("mongoose");
const Appointment = require("../Models/Appointment");


const createAppointment = async (appointmentData) => {
  const appointment = new Appointment(appointmentData);
  return await appointment.save();
}

const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient: patientId }).populate("doctor").populate("patient");
}

const getAppointmentsByDoctor = async (doctorId) => {
  return await Appointment.find({ doctor: doctorId }).populate("doctor").populate("patient");
}

module.exports = {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
};