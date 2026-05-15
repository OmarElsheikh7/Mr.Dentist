const mongoose = require("mongoose");
const { getShiftById,Shift } = require("../../enums/shift.enum");
const Appointment = require("../Models/Appointment");
const { generateSlots } = require("../Helper/SlotsHelper");


const BookAppointment = async (appointmentData) => {
  const appointment = new Appointment(appointmentData);
  return await appointment.save();
};

const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient: patientId }).populate({
    path: "doctor",
    select: "user",
    populate: {
      path: "user",
      select: "name",
    },
  });
};

const getAppointmentsByDoctor = async (doctorId) => {
  return await Appointment.find({ doctor: doctorId }).populate({
    path: "patient",
    select: "user",
    populate: {
      path: "user",
      select: "name",
    },
  });
};


const getAvailableSlots = async (doctorId, date, shiftId) => {
  const shift = getShiftById(shiftId);
  const allSlots = generateSlots(shift.start, shift.end);

  const booked = await Appointment.find(
    { doctor: doctorId, appointmentDate: new Date(date), shiftId },
    { slotTime: 1 }
  );

  const bookedTimes = booked.map((a) => a.slotTime);

  return allSlots.filter((slot) => !bookedTimes.includes(slot));
};



module.exports = {
  BookAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getAvailableSlots,
};
