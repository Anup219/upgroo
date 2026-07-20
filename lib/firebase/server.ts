import "server-only";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

if (!getApps().length) {
  const hasServiceAccount = 
    projectId && 
    clientEmail && 
    privateKey && 
    !privateKey.includes("REPLACE_WITH_YOUR_PRIVATE_KEY");

  if (hasServiceAccount) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey!,
      }),
      databaseURL,
    });
  } else {
    // Fallback for development without service account, assuming gcloud is authenticated
    initializeApp({ 
      projectId,
      databaseURL,
    });
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminRtdb = getDatabase();

