const bcrypt = require("bcrypt");
const UserRepository = require("../../DataAccessLayer/Repositories/UserRepository");
const DoctorRepository = require("../../DataAccessLayer/Repositories/DoctorRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");

const register = async (req, res) => {
  try {
    const { name, email, password, role, dateofBirth } = req.body;

    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      dateofBirth,
    });
    if (role === "doctor") {
      await DoctorRepository.createDoctor({
        user: user._id,
        specialty: req.body.specialty,
        consultationFee: req.body.consultationFee,
        description: req.body.description,
        shiftTiming: req.body.shiftTiming,
      });
    } else if (role === "patient") {
      await PatientRepository.createPatient({
        user: user._id,
        phoneNumber: req.body.phoneNumber,
      });
    }else if (role === "admin") {
      // Create admin-specific data if needed
    }
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

module.exports = {
  register,
};
