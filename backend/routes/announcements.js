import express from 'express';
import { getDatabase } from 'firebase-admin/database';
import firebaseApp from '../config/firebase.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const db = getDatabase(firebaseApp);

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

// GET /api/announcements - Get all announcements (Public)
router.get('/', async (req, res) => {
    try {
        const ref = db.ref('announcements');
        const snapshot = await ref.once('value');
        const data = snapshot.val() || {};

        const announcements = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).reverse(); // Newest first

        res.json({ success: true, announcements });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
});

// POST /api/announcements - Create announcement (Admin)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { title, content, type } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const newRef = db.ref('announcements').push();
        await newRef.set({
            title: title || '',
            content,
            type: type || 'news', // news, update, alert
            createdAt: new Date().toISOString()
        });

        res.json({ success: true, message: 'Announcement created successfully', id: newRef.key });
    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).json({ error: 'Failed to create announcement' });
    }
});

// PUT /api/announcements/:id - Update announcement (Admin)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, type } = req.body;

        await db.ref(`announcements/${id}`).update({
            title,
            content,
            type
        });

        res.json({ success: true, message: 'Announcement updated' });
    } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).json({ error: 'Failed to update announcement' });
    }
});

// DELETE /api/announcements/:id - Delete announcement (Admin)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await db.ref(`announcements/${id}`).remove();
        res.json({ success: true, message: 'Announcement deleted' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
});

export default router;
