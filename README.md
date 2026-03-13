# SPIC - Official Society Website & Event Portal

Welcome to the official web platform for **SPIC**. Built with modern web technologies, this platform serves as the central hub for the society, showcasing our events, team, and enabling seamless, automated student registrations.

## 🚀 Features

- **Beautiful UI**: Designed with React, Tailwind CSS, and Shadcn UI components.
- **Automated Event Registrations**: Students can easily register for all flagship events directly from the site.
- **QR Code Ticketing**: Upon successful registration, the backend automatically generates a unique QR code ticket and emails it directly to the participant.
- **Real-Time Database**: All registrations are securely stored in Firebase Firestore.
- **Google Sheets Integration**: A backup record of all registrations is synchronously appended to a designated Google Sheet.
- **Dark/Light Mode**: Full theme customization built-in.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI, Radix UI
- **Routing**: React Router
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **Server**: Express.js with TypeScript (`tsx`)
- **Database**: Firebase Admin SDK (Firestore)
- **Email Delivery**: Nodemailer
- **Integrations**: Google Sheets API
- **QR Codes**: `qrcode` package

---

## ⚙️ Local Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- A Google Cloud Project (for Sheets API)
- A Firebase Project (for Firestore Database)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd spic
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configuration Requirements

You need two things to securely connect the backend to Google/Firebase services:

**A. Firebase Service Account JSON**
Generate a private key JSON file from your Firebase Project settings and place it in the `server` directory as exactly:
`server/firebase-service-account.json`

**B. Environment Variables**
Create a `.env` file in the root directory and configure the following variables:

```env
# ─── SMTP Configuration for ticket emails ─────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# ─── API Server Port ──────────────────────────────────────────────
API_PORT=3001

# ─── Google Sheets (attendance/registration log) ──────────────────
# 1. Create a Google Sheet → copy the ID from the URL
# 2. Share the sheet with your Firebase service account email ("client_email" from JSON)
# 3. Enable Google Sheets API in your Google Cloud Console
GOOGLE_SHEET_ID=your_google_sheet_id
```

### 5. Start the Development Server

The application uses `concurrently` to run both the Vite frontend and Express backend simultaneously. 

```bash
npm run dev
```

- **Client Application**: Available at `http://localhost:5173` (by default)
- **API Server**: Available at `http://localhost:3001`

---

## 📂 Project Structure

```
├── public/                 # Static assets (images, fonts, etc.)
├── server/                 # Express backend API
│   ├── routes/             # API endpoints (registration, verification)
│   ├── services/           # External logic (email, Sheets API, QR gen)
│   ├── db.ts               # Firebase initialization
│   └── index.ts            # Main Express server entry
├── src/                    # React frontend application
│   ├── components/         # Reusable UI elements & layouts
│   ├── lib/                # Utility functions
│   ├── pages/              # Main view routes
│   ├── App.tsx             # Application router
│   └── main.tsx            # React root
├── .env                    # Environment variables (do not commit)
└── package.json            # Scripts & dependencies
```

---

## 🛡️ Important Notes

- Do **not** commit your `.env` file or `firebase-service-account.json` to public version control. They are automatically added to the `.gitignore`.
- If you encounter a `Permission Denied` error from the Google Sheets API, ensure the Google Sheet is shared with the robotic `client_email` found inside your `firebase-service-account.json` and that the Google Sheets API is turned on in the Cloud console.
