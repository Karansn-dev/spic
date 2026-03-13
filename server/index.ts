import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import registrationRouter from "./routes/registration.js";
import verificationRouter from "./routes/verification.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || process.env.API_PORT || 3001);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

// ─── API routes ──────────────────────────────────────────────────────
app.use("/api/registrations", registrationRouter);
app.use("/api/verify", verificationRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production" || process.env.SERVE_FRONTEND === "true") {
  // Assuming the build outputs to 'dist' in the project root
  const distPath = path.resolve(__dirname, "..", "dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`[server] API running on http://localhost:${PORT}`);
});
