const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { phone, role, name } = req.body;

    if (!phone || !role) {
      return res.status(400).json({ error: "Phone and role required" });
    }

    let user = await User.findOne({ phone, role });

    if (!user) {
      user = new User({ phone, role, name });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
