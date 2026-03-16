import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { getDb, REGISTRATIONS } from "../db.js";
import { requireAdminAuth } from "../services/adminAuth.js";
import { markAttendanceInSheet } from "../services/sheets.js";

const router = Router();

// ─── Verify & check-in a participant ────────────────────────────────
router.post("/", requireAdminAuth, async (req: Request, res: Response) => {
  const { registrationId, eventId, verificationToken } = req.body;

  if (!registrationId || !eventId || !verificationToken) {
    res.status(400).json({ error: "Invalid QR data." });
    return;
  }

  const db = getDb();
  const doc = await db.collection(REGISTRATIONS).doc(registrationId).get();

  if (!doc.exists) {
    res.status(404).json({ valid: false, error: "Registration not found." });
    return;
  }

  const row = doc.data()!;

  if (row.eventId !== eventId) {
    res.status(404).json({ valid: false, error: "Registration not found." });
    return;
  }

  // Constant-time comparison to prevent timing attacks
  const tokenBuffer = Buffer.from(row.verificationToken, "utf8");
  const inputBuffer = Buffer.from(verificationToken, "utf8");

  if (
    tokenBuffer.length !== inputBuffer.length ||
    !crypto.timingSafeEqual(tokenBuffer, inputBuffer)
  ) {
    res.status(403).json({ valid: false, error: "Invalid verification token." });
    return;
  }

  if (row.checkedIn) {
    res.status(409).json({
      valid: false,
      error: "This ticket has already been used.",
      participantName: row.participantName,
    });
    return;
  }

  // Mark as checked-in
  const checkedInAt = new Date().toISOString();
  await db.collection(REGISTRATIONS).doc(doc.id).update({
    checkedIn: true,
    checkedInAt,
  });

  // Log attendance to Google Sheet (non-blocking)
  markAttendanceInSheet({
    participantName: row.participantName,
    phone: row.phone ?? null,
  })
    .then((result) => {
      if (!result.success) {
        console.error("[verify] Sheet append failed:", result.error);
      }
    })
    .catch((err) => console.error("[verify] Sheet append error:", err));

  res.json({
    valid: true,
    participantName: row.participantName,
    participantEmail: row.participantEmail,
    eventName: row.eventName,
  });
});

export default router;
