const DoctorController = require("../Controllers/DoctorController");
const express = require("express");
const router = express.Router();
const { authorizeRoles, protect } = require("../Middleware/AuthMiddleware");

//Admin routes
router.post("/",protect,authorizeRoles("admin"), DoctorController.createDoctor);
router.delete("/:id", protect, authorizeRoles("admin"), DoctorController.deleteDoctor);

//Doctor routes
router.put("/:id", protect,authorizeRoles("doctor","admin"), DoctorController.updateDoctor);
router.get("/reviews", protect, authorizeRoles("doctor"), DoctorController.getDoctorReviews);
router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);

module.exports = router;
