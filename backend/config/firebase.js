import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Path to the service account JSON file (one level up from config)
const serviceAccountPath = path.join(__dirname, '../supeai-6da3b-firebase-adminsdk-fbsvc-566569aad4.json');

let app;

try {
  let credential;

  // Check if the specific JSON file exists
  if (fs.existsSync(serviceAccountPath)) {
    console.log('✅ Found service account JSON file:', path.basename(serviceAccountPath));
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    credential = admin.credential.cert(serviceAccount);
  } else {
    // Fallback to environment variables
    console.log('ℹ️ Service account JSON not found, using environment variables');

    // Validate required Firebase environment variables
    const requiredFields = [
      'FIREBASE_PROJECT_ID',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_DATABASE_URL'
    ];

    const missingFields = requiredFields.filter(field => !process.env[field]);

    if (missingFields.length > 0) {
      console.error('❌ Missing required Firebase environment variables:');
      missingFields.forEach(field => console.error(`   - ${field}`));
      console.error('\nPlease check your backend/.env file and ensure all Firebase credentials are set.');
      process.exit(1);
    }

    // Parse and clean the private key
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Remove surrounding quotes if present
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
      privateKey = privateKey.slice(1, -1);
    }

    // Replace escaped newlines with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Validate private key format
    if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
      console.error('❌ Invalid Firebase private key format in .env');
      process.exit(1);
    }

    const serviceAccount = {
      "type": process.env.FIREBASE_TYPE || "service_account",
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": privateKey,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
      "token_uri": process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
      "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com"
    };

    credential = admin.credential.cert(serviceAccount);
  }

  app = admin.initializeApp({
    credential: credential,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:');
  console.error('   Error:', error.message);
  process.exit(1);
}

export default app;