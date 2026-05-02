const bcrypt = require("bcrypt");
const { generateToken } = require("../Helpers/AuthHelper");
const UserRepository = require("../../DataAccessLayer/Repositories/UserRepository");
const PatientRepository = require("../../DataAccessLayer/Repositories/PatientRepository");

const register = async (req, res) => {
  try {

    const existingUser = await UserRepository.findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await UserRepository.createUser({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "patient",
      dateofBirth: req.body.dateofBirth,
      gender: req.body.gender,
    });
    await PatientRepository.createPatient({
      user: user._id,
      phoneNumber: req.body.phoneNumber,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.json({ message: "Login successful", token, data: user });
    
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = {
  register,
  login,
};
