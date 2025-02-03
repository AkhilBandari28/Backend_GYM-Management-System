const Billing = require("../models/Billing");

// Create a bill
exports.createBill = async (req, res) => {
    const { memberId, amount, description } = req.body;

    try {
        const bill = await Billing.create({ memberId, amount, description });
        res.status(201).json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bills
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Billing.find().populate("memberId", "name email");
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bills for a specific member
exports.getBillsByMember = async (req, res) => {
    const { memberId } = req.params;

    try {
        const bills = await Billing.find({ memberId });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
