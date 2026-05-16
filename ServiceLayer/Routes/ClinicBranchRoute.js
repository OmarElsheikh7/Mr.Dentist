const branchController = require('../Controllers/ClinicBranchController');
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");

router.post("/",protect,authorizeRoles("admin"), branchController.createClinicBranch);
router.put("/:id", protect, authorizeRoles("admin"), branchController.updateClinicBranch);
router.delete("/:id", protect, authorizeRoles("admin"), branchController.deleteClinicBranch);
router.get("/",protect,authorizeRoles("admin"),branchController.getAllClinicBranches);
router.get("/:id",protect,authorizeRoles("admin"), branchController.getClinicBranchById);

module.exports = router;