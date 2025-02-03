const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); 

const router = express.Router();

// Route to register a new user
router.post("/register", register)
router.post('/login', login)
// Route to get the logged-in user's profile
router.get("/profile", protect, getProfile);

module.exports = router;
