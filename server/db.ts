import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db: Firestore;

export function getDb(): Firestore {
  if (!db) {
    const keyPath = path.join(__dirname, "firebase-service-account.json");
    const serviceAccount = JSON.parse(
      readFileSync(keyPath, "utf-8")
    ) as ServiceAccount;

    initializeApp({ credential: cert(serviceAccount) });
    db = getFirestore();
  }
  return db;
}

export const REGISTRATIONS = "registrations";
