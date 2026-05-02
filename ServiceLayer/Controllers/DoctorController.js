const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");
const bcrypt = require("bcrypt");

const createDoctor = async (req, res) => {
  try {
    const doctorData = {
      specialty: req.body.specialty,
      consultationFee: req.body.consultationFee,
      description: req.body.description,
      shiftTiming: req.body.shiftTiming,
    };
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      role: "doctor",
      dateofBirth: req.body.dateofBirth,
    };
    const doctor = await DoctorRepository.createDoctorWithUser(
      doctorData,
      userData,
    );
    res.status(201).json({ message: "Doctor created successfully", data: doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorData = {
      specialty: req.body.specialty,
      consultationFee: req.body.consultationFee,
      description: req.body.description,
      shiftTiming: req.body.shiftTiming,
    };
    const userData = {
      name: req.body.name,
      email: req.body.email,
      dateofBirth: req.body.dateofBirth,
      gender: req.body.gender,
    };
    const doctor = await DoctorRepository.updateDoctor(
      doctorId,
      doctorData,
      userData,
    );
    res.status(200).json({ message: "Doctor updated successfully", data: doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await DoctorRepository.findDoctorById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    await DoctorRepository.deleteDoctor(doctorId);

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorRepository.getAllDoctors();

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json({ message: "Doctors retrieved successfully", data: doctors });
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await DoctorRepository.findDoctorById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor retrieved successfully", data: doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
};