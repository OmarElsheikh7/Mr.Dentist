const User = require("../Models/User");

const createUser = async (userData, options = {}) => {
  const user = new User(userData);
  return await user.save(options);
};

const updateUser = async (userId, userData, options = {}) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true, ...options });
};

const deleteUser = async (userId, options = {}) => {
  return await User.findByIdAndDelete(userId, options);
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
