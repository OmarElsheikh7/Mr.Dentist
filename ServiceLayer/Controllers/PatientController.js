const patientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");
const bcrypt = require('bcrypt');

const createPatient = async (req, res) => {
  try {
    const patientData = {
        phoneNumber: req.body.phoneNumber
    };
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      role: "patient",
      dateofBirth: req.body.dateofBirth,
    };
    const patient = await patientRepository.createPatientWithUser(
      patientData,
      userData,
    );
    res.status(201).json({ message: "Patient created successfully", data: patient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientData = {
            phoneNumber: req.body.phoneNumber
        };
        const userData = {
           name: req.body.name,
           email: req.body.email,
           gender: req.body.gender,
           dateofBirth: req.body.dateofBirth,
        };

        const patient = await patientRepository.updatePatient(patientId, patientData, userData);
        res.status(200).json({ message: "Patient updated successfully", data: patient });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        await patientRepository.deletePatient(patientId);
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPatient,
    updatePatient,
    deletePatient
};
