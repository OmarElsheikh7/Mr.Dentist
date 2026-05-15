const branchController = require('../Controllers/ClinicBranchController');
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");

router.post("/",protect,authorizeRoles("admin"), branchController.createClinicBranch);
router.get("/",protect,authorizeRoles("admin"),branchController.getAllClinicBranches);
router.get("/:id",protect,authorizeRoles("admin"), branchController.getClinicBranchById);

module.exports = router;