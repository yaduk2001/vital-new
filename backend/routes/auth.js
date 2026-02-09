import express from 'express';
import firebaseApp from '../config/firebase.js';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import session from 'express-session';
import nodemailer from 'nodemailer';

const router = express.Router();
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// Session middleware
router.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Get current session
router.get('/session', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(200).json({ user: null });
    }

    // Get user data from Firebase Auth
    const userRecord = await auth.getUser(userId);

    // Get additional user data from Realtime Database
    const userRef = db.ref('users/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    res.status(200).json({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        ...userData
      }
    });
  } catch (error) {
    console.error('Session check error:', error);
    res.status(200).json({ user: null });
  }
});

// Google Sign-in
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Get or create user record
    let userRecord;
    try {
      userRecord = await auth.getUser(uid);
    } catch (error) {
      // User doesn't exist, create new user
      userRecord = await auth.createUser({
        uid,
        email,
        displayName: name,
        photoURL: picture,
        emailVerified: true
      });

      // Store additional user data in Realtime Database
      const userRef = db.ref('users/' + uid);
      await userRef.set({
        name,
        email,
        picture,
        accountType: 'personal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider: 'google'
      });
    }

    // Set session
    req.session.userId = uid;

    res.status(200).json({
      message: 'Google sign-in successful',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(401).json({ 
      message: error.message || 'Google sign-in failed' 
    });
  }
});

// Sign up with email/password
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone, accountType } = req.body;
    console.log('Signup request received:', { email, name, phone, accountType });

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Email, password, and name are required' 
      });
    }

    // Create user in Firebase Authentication (backend handles all Firebase operations)
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: false, // User needs to verify email
      });
      console.log('User created in Firebase Auth:', userRecord.uid);
    } catch (error) {
      console.error('Firebase user creation error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use') {
        return res.status(400).json({ 
          message: 'This email is already registered. Please log in or use a different email.' 
        });
      }
      
      if (error.code === 'auth/invalid-email') {
        return res.status(400).json({ 
          message: 'Invalid email address format' 
        });
      }
      
      if (error.code === 'auth/weak-password') {
        return res.status(400).json({ 
          message: 'Password is too weak. Please use a stronger password.' 
        });
      }
      
      throw error; // Re-throw other errors
    }

    // Generate and send verification email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // Get frontend URL from environment variable (required for email verification)
        if (!process.env.FRONTEND_URL) {
          console.warn('⚠️ FRONTEND_URL not set. Skipping email verification.');
        } else {
          // Handle comma-separated values (use first URL)
          const frontendUrl = process.env.FRONTEND_URL.split(',')[0].trim();
          
          // Generate email verification link
          const actionCodeSettings = {
            url: `${frontendUrl}/auth/login?emailVerified=true`,
            handleCodeInApp: false,
          };
          
          // Generate verification link using Firebase Admin SDK
          const verificationLink = await auth.generateEmailVerificationLink(email, actionCodeSettings);
          
          // Send verification email using nodemailer
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          
          await transporter.sendMail({
            from: `"Supe AI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your Supe AI account',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #146EE9;">Welcome to Supe AI, ${name}!</h2>
                <p>Thank you for creating an account. Please verify your email address to complete your registration.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationLink}" 
                     style="background-color: #146EE9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Email Address
                  </a>
                </div>
                <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="color: #666; font-size: 12px; word-break: break-all;">${verificationLink}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                  If you didn't create this account, please ignore this email.
                </p>
              </div>
            `,
            text: `Welcome to Supe AI, ${name}! Please verify your email by visiting: ${verificationLink}`,
          });
          
          console.log('✅ Verification email sent to:', email);
        }
      } else {
        console.warn('⚠️ Email credentials not configured. Verification email not sent.');
      }
    } catch (verifyError) {
      console.warn('⚠️ Could not send verification email:', verifyError.message);
      // Don't fail signup if verification email fails
    }

    // Store additional user data in Realtime Database
    const userRef = db.ref('users/' + userRecord.uid);
    const userData = {
      name,
      email,
      phone,
      accountType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provider: 'email'
    };
    
    await userRef.set(userData);
    console.log('User data stored in Realtime Database');

    res.status(201).json({ 
      message: 'User created successfully',
      userId: userRecord.uid 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    console.error('Error stack:', error.stack);
    // Return 500 for server errors, 400 for client errors
    const statusCode = error.code?.startsWith('auth/') ? 400 : 500;
    res.status(statusCode).json({ 
      message: error.message || 'Failed to create user' 
    });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify the user's credentials
    const userCredential = await auth.getUserByEmail(email);

    // Get additional user data from Realtime Database
    const userRef = db.ref('users/' + userCredential.uid);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    // Create session
    req.session.userId = userCredential.uid;
    
    res.status(200).json({ 
      message: 'Login successful',
      user: {
        uid: userCredential.uid,
        email: userCredential.email,
        displayName: userCredential.displayName,
        ...userData
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ 
      message: error.message || 'Invalid email or password' 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userRecord = await auth.getUser(req.session.userId);
    const userRef = db.ref('users/' + req.session.userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      ...userData
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;