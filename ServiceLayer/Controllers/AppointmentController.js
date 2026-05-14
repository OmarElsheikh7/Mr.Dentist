const AppointmentRepository = require("../../DataAccessLayer/Repositories/AppointmentRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");
const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");


const bookAppointment = async (req, res) => {
  try {
    const patient = await PatientRepository.findPatientByUserId(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const doctor = await DoctorRepository.findDoctorById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointmentData = {
        patient: patient._id,
        doctor: doctor._id,
        branch: doctor.branchId,
        appointmentDate: req.body.appointmentDate,
        shiftId: req.body.shiftId,
        slotTime: req.body.slotTime,
    };

    const appointment = await AppointmentRepository.BookAppointment(appointmentData);
    res.status(201).json({ message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }     
};

module.exports = {
  bookAppointment, };