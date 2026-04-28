const DoctorController = require("../Controllers/DoctorController");
const express = require("express");
const router = express.Router();
const { isAdmin, protect } = require("../Middleware/AuthMiddleware");

//Admin routes
router.post("/",protect,isAdmin, DoctorController.createDoctor);
router.delete("/:id", protect, isAdmin, DoctorController.deleteDoctor);

//Doctor routes
router.put("/:id", protect, DoctorController.updateDoctor);
router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);

module.exports = router;
