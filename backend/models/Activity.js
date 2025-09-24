const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		plantationName: { type: String, required: true },
		hectares: { type: Number, required: true },
		photo: String,
		location: String,
		carbonAbsorbed: Number,
		status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
		reason: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
