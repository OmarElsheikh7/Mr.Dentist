const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pictureUrl: {
    type: String,
    default: "https://res.cloudinary.com/dgluygqlu/image/upload/v1778953549/man-avatar_imtor0.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
    required: true,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  pictureUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);