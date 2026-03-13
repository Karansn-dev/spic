import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY_PATH = path.join(__dirname, "..", "firebase-service-account.json");

const authOptions: any = {
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
};

if (process.env.FIREBASE_CONFIG) {
  authOptions.credentials = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  authOptions.keyFile = KEY_PATH;
}

// Re-use the same Firebase service account for Google Sheets access
const auth = new google.auth.GoogleAuth(authOptions);

const sheets = google.sheets({ version: "v4", auth });

/**
 * Find the participant's existing row in the Google Sheet and mark them as Present.
 * Target Columns: A=Name, B=Branch, C=Year, D=Phone
 * We update Column E with "Present".
 */
export async function markAttendanceInSheet(data: {
  participantName: string;
  phone: string | null;
}): Promise<{ success: boolean; error?: string }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.warn("[sheets] GOOGLE_SHEET_ID not set — skipping attendance log.");
    return { success: false, error: "GOOGLE_SHEET_ID not configured." };
  }

  try {
    // 1. Read existing rows to find the participant
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A:D",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { success: false, error: "Sheet is empty; cannot mark attendance." };
    }

    let matchIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      const rowName = rows[i][0]?.trim().toLowerCase() || "";
      const rowPhone = rows[i][3]?.trim() || "";

      // Prioritize matching both name and phone if phone exists
      if (
        rowName === data.participantName.trim().toLowerCase() &&
        (data.phone ? rowPhone === data.phone.trim() : true)
      ) {
        matchIndex = i;
        break;
      }
    }

    if (matchIndex === -1) {
      return { success: false, error: "Participant not found in the Google Sheet." };
    }

    // 2. Update Column E (the 5th column) with 'Present'
    const updateRange = `Sheet1!E${matchIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: updateRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Present"]],
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("[sheets] Failed to mark attendance:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Append a registration row to the configured Google Sheet.
 * Columns: Registration ID | Name | Email | Phone | Roll Number | Year | Branch | Event | Event Date | Venue | Timestamp
 */
export async function appendRegistrationRow(data: {
  id: string;
  participantName: string;
  participantEmail: string;
  phone: string | null;
  rollNumber: string | null;
  year: string | null;
  branch: string | null;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  createdAt: string;
}): Promise<{ success: boolean; error?: string }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.warn("[sheets] GOOGLE_SHEET_ID not set \u2014 skipping registration log.");
    return { success: false, error: "GOOGLE_SHEET_ID not configured." };
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.participantName,
            data.branch ?? "",
            data.year ?? "",
            data.phone ?? "",
          ],
        ],
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("[sheets] Failed to append registration row:", err.message);
    return { success: false, error: err.message };
  }
}
