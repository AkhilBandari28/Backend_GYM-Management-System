const express = require("express");
const { generateReport } = require("../controllers/reportController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Generate a gym report (admin only)
router.get("/", protect, admin, generateReport);

module.exports = router;
