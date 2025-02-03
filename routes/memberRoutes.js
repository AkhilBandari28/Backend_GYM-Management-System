const express = require("express");
const {
    addMember,
    updateMember,
    deleteMember,
    getAllMembers,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to add a new member (admin only)
router.post("/", protect, addMember);

// Route to update member details (admin only)
router.put("/:id", protect, updateMember);

// Route to delete a member (admin only)
router.delete("/:id", protect, deleteMember);

// Route to get all members (admin only)
router.get("/", protect, getAllMembers);

module.exports = router;
