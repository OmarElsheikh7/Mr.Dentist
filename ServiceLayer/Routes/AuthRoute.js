const AuthController = require("../Controllers/AuthController");
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");
const express = require("express");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", protect, authorizeRoles("patient", "doctor","admin"), AuthController.getProfile);

module.exports = router;