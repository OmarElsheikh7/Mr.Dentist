const DoctorController = require("../Controllers/DoctorController");
const express = require("express");
const router = express.Router();
const { isAdmin } = require("../Middleware/AuthMiddleware");

//Admin routes
router.post("/",  DoctorController.createDoctor);
router.delete("/:id",  DoctorController.deleteDoctor);

//Doctor routes
router.put("/:id", DoctorController.updateDoctor);
router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);


module.exports = router;