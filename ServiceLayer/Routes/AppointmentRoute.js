const AppointmentController = require("../Controllers/AppointmentController");
const express = require("express");
const router = express.Router();
const { authorizeRoles, protect } = require("../Middleware/AuthMiddleware");






module.exports = router;

//Patient routes  