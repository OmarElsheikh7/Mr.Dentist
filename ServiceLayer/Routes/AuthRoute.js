const AuthController = require("../Controllers/AuthController");
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");
const { uploadMiddleware } = require("../Helpers/CloudinaryHelper");
const express = require("express");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", protect, authorizeRoles("patient", "doctor","admin"), AuthController.getProfile);
router.put("/profile", protect, authorizeRoles("patient", "doctor"), AuthController.updateProfile);
router.put("/profile/upload-picture", protect, authorizeRoles("patient", "doctor"),uploadMiddleware.single("profilePicture"), AuthController.uploadProfilePicture);

module.exports = router;