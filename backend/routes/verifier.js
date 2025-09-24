import express from "express";
import Activity from "../models/activity.js";   // ⬅ lowercase now
import { requireAuth, requireRole } from "../middleware/auth.js";
import { ethers } from "ethers";

const router = express.Router();

// all routes need verifier
router.use(requireAuth, requireRole("verifier"));

// GET /api/verifier/pending
router.get("/pending", async (req, res) => {
  try {
    const items = await Activity.find({ status: "pending" });
    res.json(items);
  } catch (err) {
    console.error("❌ Pending fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/verifier/review
router.post("/review", async (req, res) => {
  try {
    const { activityId, approved, reason } = req.body;

    if (!activityId) {
      return res.status(400).json({ error: "activityId is required" });
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    if (approved) {
      const hectares = activity.hectares || 1;
      const carbonAbsorbed = hectares * 10; // demo formula

      activity.status = "approved";
      activity.carbonAbsorbed = carbonAbsorbed;
      activity.reason = null;

      // mint credits on blockchain
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      const wallet = new ethers.Wallet("0x" + process.env.PRIVATE_KEY, provider);

      const abi = ["function mintCredits(string,uint256)"];
      const registry = new ethers.Contract(
        process.env.REGISTRY_ADDRESS,
        abi,
        wallet
      );

      await registry.mintCredits(activity._id.toString(), carbonAbsorbed);
    } else {
      activity.status = "rejected";
      activity.reason = reason || "No reason provided";
    }

    await activity.save();

    res.json({
      success: true,
      status: activity.status,
      reason: activity.reason,
      carbonAbsorbed: activity.carbonAbsorbed || 0
    });
  } catch (err) {
    console.error("❌ Review error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
