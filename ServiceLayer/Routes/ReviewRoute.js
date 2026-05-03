const ReviewController = require("../Controllers/ReviewController");
const express = require("express");
const router = express.Router();
const { authorizeRoles, protect } = require("../Middleware/AuthMiddleware");

router.post("/:id", protect, authorizeRoles("patient"), ReviewController.createReview);

module.exports = router;