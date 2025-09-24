import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  user: String,
  photo: String,
  hectares: Number,
  carbonAbsorbed: Number,
  status: { type: String, default: "pending" }, // pending | approved | rejected
  reason: String
});

export default mongoose.model("Activity", ActivitySchema);
