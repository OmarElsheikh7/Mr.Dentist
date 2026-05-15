const AppointmentRepository = require("../../DataAccessLayer/Repositories/AppointmentRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");
const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");



const GetAvailableSlots = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await DoctorRepository.findDoctorById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const date = req.body.date;
    const shiftId = doctor.shiftID;
    const slots = await AppointmentRepository.getAvailableSlots(doctorId, date, shiftId);
    res.status(200).json({ message: "Available slots retrieved successfully", data: slots });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } 
};

const GetPatientAppointments = async (req, res) => {
  try {
    const patient = await PatientRepository.findPatientByUserId(req.user.id);
    const appointments = await AppointmentRepository.getAppointmentsByPatient(patient._id);
    res.status(200).json({ message: "Appointments retrieved successfully", data: appointments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetDoctorAppointments = async (req, res) => {
  try {
    const doctor = await DoctorRepository.findDoctorByUserId(req.user.id);
    const appointments = await AppointmentRepository.getAppointmentsByDoctor(doctor._id);
    res.status(200).json({ message: "Appointments retrieved successfully", data: appointments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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
        totalCost: doctor.consultationFee,
        appointmentDate: req.body.appointmentDate,
        shiftId: doctor.shiftID,
        slotTime: req.body.slotTime,
    };

    const appointment = await AppointmentRepository.BookAppointment(appointmentData);
    res.status(201).json({ message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }     
};

module.exports = {
  bookAppointment,
  GetAvailableSlots,
  GetPatientAppointments,
  GetDoctorAppointments
};