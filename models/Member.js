const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        package: {
            type: String,
            required: true,
            enum: ["Basic", "Standard", "Premium"],
        },
        joinDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
