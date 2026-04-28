const User = require("../Models/User");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
    return await User.findById(id);
}; 

const getAllUsers = async () => {
    return await User.find();
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers
};
