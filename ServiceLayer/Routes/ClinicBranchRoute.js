const branchController = require('../Controllers/ClinicBranchController');
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");

router.post("/",protect,authorizeRoles("admin"), branchController.createClinicBranch);

module.exports = router;