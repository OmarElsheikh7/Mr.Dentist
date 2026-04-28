const Doctor = require("../Models/Doctor");

const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};
module.exports = {
    createDoctor,
};