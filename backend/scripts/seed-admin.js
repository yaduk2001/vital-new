import { getDatabase } from 'firebase-admin/database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

// Initialize Firebase if not already
if (!admin.apps.length) {
    try {
        let credential;

        // Environment handling similar to backend/config/firebase.js
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
            let privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
            const serviceAccount = {
                "type": "service_account",
                "project_id": process.env.FIREBASE_PROJECT_ID,
                "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
                "private_key": privateKey,
                "client_email": process.env.FIREBASE_CLIENT_EMAIL,
                "client_id": process.env.FIREBASE_CLIENT_ID,
                "auth_uri": process.env.FIREBASE_AUTH_URI,
                "token_uri": process.env.FIREBASE_TOKEN_URI,
                "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
                "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
                "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
            };
            credential = admin.credential.cert(serviceAccount);
        } else {
            console.error('Missing Firebase credentials in .env');
            process.exit(1);
        }

        admin.initializeApp({
            credential: credential,
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    } catch (e) {
        console.error('Firebase init error:', e);
        process.exit(1);
    }
}

const db = getDatabase();

async function seedAdmin() {
    const adminEmail = 'admin@supeai.com';
    const rawPassword = 'supe@kochi';

    console.log(`Checking for admin: ${adminEmail}...`);

    try {
        // We store admins in a separate root node "admins"
        // Keyed by a safe version of email (replacing dots with commas is common in firebase keys, or hash it)
        // Actually, let's just use push ID or hash of email as key.
        // Let's query by email.

        const adminsRef = db.ref('admins');
        const snapshot = await adminsRef.orderByChild('email').equalTo(adminEmail).once('value');

        if (snapshot.exists()) {
            console.log('✅ Admin already exists.');
            process.exit(0);
        }

        console.log('Creating new admin...');
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newAdminRef = adminsRef.push();
        await newAdminRef.set({
            email: adminEmail,
            password: hashedPassword,
            role: 'super_admin',
            createdAt: new Date().toISOString()
        });

        console.log('✅ Admin created successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
