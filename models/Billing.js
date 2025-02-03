const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
    {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
        amount: { type: Number, required: true },
        description: { type: String, default: "Monthly Subscription" },
        paymentDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Billing", BillingSchema);
