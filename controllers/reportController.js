const Billing = require("../models/Billing");
const Member = require("../models/Member");

// Generate report
exports.generateReport = async (req, res) => {
    try {
        const members = await Member.find();
        const bills = await Billing.find();

        const report = {
            totalMembers: members.length,
            totalBills: bills.length,
            totalAmount: bills.reduce((sum, bill) => sum + bill.amount, 0),
        };

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
