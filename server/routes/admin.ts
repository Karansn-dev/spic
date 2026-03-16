import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import {
  clearAdminSession,
  hasValidAdminSession,
  issueAdminSession,
} from "../services/adminAuth.js";

const router = Router();

router.get("/session", (_req: Request, res: Response) => {
  res.json({ authenticated: hasValidAdminSession(_req) });
});

router.post("/login", (req: Request, res: Response) => {
  const configuredPin = process.env.ADMIN_PIN;
  const providedPin = String(req.body?.pin ?? "");

  if (!configuredPin) {
    res.status(500).json({ error: "ADMIN_PIN is not configured." });
    return;
  }

  const configuredBuffer = Buffer.from(configuredPin, "utf8");
  const providedBuffer = Buffer.from(providedPin, "utf8");

  if (
    configuredBuffer.length !== providedBuffer.length ||
    !crypto.timingSafeEqual(configuredBuffer, providedBuffer)
  ) {
    res.status(401).json({ error: "Incorrect PIN." });
    return;
  }

  issueAdminSession(res);
  res.json({ authenticated: true });
});

router.post("/logout", (_req: Request, res: Response) => {
  clearAdminSession(res);
  res.json({ authenticated: false });
});

export default router;
