import express from 'express';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import firebaseApp from '../config/firebase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// JWT Secret - ideally should be in .env
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'super-secret-admin-key-change-this';

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
    const token = req.cookies?.admin_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Fetch admin by email
        const adminsRef = db.ref('admins');
        const snapshot = await adminsRef.orderByChild('email').equalTo(email).once('value');

        if (!snapshot.exists()) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admins = snapshot.val();
        const adminKey = Object.keys(admins)[0];
        const adminData = admins[adminKey];

        // Verify password
        const isMatch = await bcrypt.compare(password, adminData.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: adminKey, email: adminData.email, role: adminData.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set Cookie (HttpOnly)
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ success: true, message: 'Login successful' });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin Logout
router.post('/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true, message: 'Logged out successfully' });
});

// Check Admin Status
router.get('/check-auth', verifyAdmin, (req, res) => {
    res.json({ isAuthenticated: true, admin: req.admin });
});

// Get All Users (Combine Auth users with DB details)
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        // 1. Fetch users from Firebase Auth
        let allUsers = [];
        let nextPageToken;

        do {
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        // 2. Fetch user details from Realtime Database
        const usersRef = db.ref('users');
        const dbSnapshot = await usersRef.once('value');
        const dbUsers = dbSnapshot.val() || {};

        // 3. Merge data
        const mergedUsers = allUsers.map(user => {
            const dbData = dbUsers[user.uid] || {};
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || dbData.name || 'N/A',
                photoURL: user.photoURL || dbData.picture,
                disabled: user.disabled,
                metadata: user.metadata,
                providerData: user.providerData,
                accountType: dbData.accountType || 'unknown',
                role: dbData.role || 'user',
                createdAt: dbData.createdAt || user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime
            };
        });

        res.json({ success: true, users: mergedUsers });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Toggle User Status (Disable/Enable)
router.patch('/users/:uid/status', verifyAdmin, async (req, res) => {
    try {
        const { uid } = req.params;
        const { disabled } = req.body; // true to disable, false to enable

        await auth.updateUser(uid, { disabled });

        res.json({ success: true, message: `User ${disabled ? 'disabled' : 'enabled'} successfully` });

    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

// Delete User
router.delete('/users/:uid', verifyAdmin, async (req, res) => {
    try {
        const { uid } = req.params;

        // Delete from Auth
        await auth.deleteUser(uid);

        // Delete from DB
        await db.ref('users/' + uid).remove();

        res.json({ success: true, message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Get Analytics
router.get('/stats', verifyAdmin, async (req, res) => {
    try {
        // Basic stats from DB / Auth
        // This is simplified. In production, caching might be needed for large datasets.

        let totalUsers = 0;
        let activeUsers = 0;
        let newUsersToday = 0;

        // Use listUsers for total count? No, listUsers is paginated.
        // For accurate counts without pagination, maybe rely on DB count if synced.
        // Let's iterate Auth users (expensive but okay for small scale).

        let allUsers = [];
        let nextPageToken;
        do {
            const result = await auth.listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(result.users);
            nextPageToken = result.pageToken;
        } while (nextPageToken);

        totalUsers = allUsers.length;
        activeUsers = allUsers.filter(u => !u.disabled).length;

        const today = new Date().setHours(0, 0, 0, 0);
        newUsersToday = allUsers.filter(u => {
            const created = new Date(u.metadata.creationTime).getTime();
            return created >= today;
        }).length;

        res.json({
            success: true,
            stats: {
                totalUsers,
                activeUsers,
                newUsersToday
            }
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

export default router;
