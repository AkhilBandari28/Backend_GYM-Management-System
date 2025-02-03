const Member = require("../models/Member");

// Add a new member
exports.addMember = async (req, res) => {
    const { name, email, phone, package } = req.body;

    try {
        const memberExists = await Member.findOne({ email });
        if (memberExists) return res.status(400).json({ message: "Member already exists" });

        const member = await Member.create({ name, email, phone, package });
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a member
exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, package } = req.body;

    try {
        const member = await Member.findByIdAndUpdate(
            id,
            { name, email, phone, package },
            { new: true }
        );

        if (!member) return res.status(404).json({ message: "Member not found" });

        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findByIdAndDelete(id);
        if (!member) return res.status(404).json({ message: "Member not found" });

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
