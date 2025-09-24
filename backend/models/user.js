const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "verifier"], required: true },
  name: String, // optional name
});

module.exports = mongoose.model("User", userSchema);
