import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plantationName: String,
    hectares: Number,
    photo: String,
    location: String,
    carbonAbsorbed: Number,
    status: { type: String, default: "pending" },
    reason: { type: String }
  },
  { timestamps: true }
);
const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;   // 👈 this makes it a "default export"




