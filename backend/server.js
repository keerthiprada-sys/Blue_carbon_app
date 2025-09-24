import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import verifierRoutes from "./routes/verifier.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// routes
app.use("/api/verifier", verifierRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
