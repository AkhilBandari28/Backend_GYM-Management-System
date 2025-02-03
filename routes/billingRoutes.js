const express = require("express");
const {
    createBill,
    getAllBills,
    getBillsByMember,
} = require("../controllers/billingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a bill for a member (admin only)
router.post("/", protect, createBill);

// Route to get all bills (admin only)
router.get("/", protect, getAllBills);

// Route to get bills for a specific member (admin only)
router.get("/:memberId", protect, getBillsByMember);

module.exports = router;
