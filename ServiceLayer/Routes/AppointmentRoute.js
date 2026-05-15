const AppointmentController = require("../Controllers/AppointmentController");
const express = require("express");
const router = express.Router();
const { authorizeRoles, protect } = require("../Middleware/AuthMiddleware");


//Patient routes  
router.post("/:id", protect, authorizeRoles("patient"), AppointmentController.bookAppointment);
router.get("/patient/appointments", protect, authorizeRoles("patient"), AppointmentController.GetPatientAppointments);
router.post("/Availableslots/:id", protect, authorizeRoles("patient","admin"), AppointmentController.GetAvailableSlots);


//Doctor routes
router.get("/doctor/appointments", protect, authorizeRoles("doctor"), AppointmentController.GetDoctorAppointments);

module.exports = router;

