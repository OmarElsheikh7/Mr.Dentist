const PatientController = require("../Controllers/PatientController");
const express = require("express");
const router = express.Router();
const { authorizeRoles, protect } = require("../Middleware/AuthMiddleware");

router.post("/", protect, authorizeRoles("admin"), PatientController.createPatient);
router.put("/:id", protect, authorizeRoles("admin"), PatientController.updatePatient);
router.delete("/:id", protect, authorizeRoles("admin"), PatientController.deletePatient);


module.exports = router;