import express from 'express';
import { getDatabase } from 'firebase-admin/database';
import firebaseApp from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const db = getDatabase(firebaseApp);

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'super-secret-admin-key-change-this';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

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

// GET /api/testimonials - Get all testimonials (Public)
router.get('/', async (req, res) => {
    try {
        const ref = db.ref('testimonials');
        const snapshot = await ref.once('value');
        const data = snapshot.val() || {};

        const testimonials = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).reverse(); // Newest first

        res.json({ success: true, testimonials });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

// POST /api/testimonials - Add a testimonial (Admin)
router.post('/', verifyAdmin, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
    try {
        const { name, post, gender, message, photoUrl } = req.body;

        let finalPhotoUrl = photoUrl || '';
        let finalAudioUrl = '';

        const protocol = req.protocol;
        const host = req.get('host');

        if (req.files) {
            if (req.files.photo && req.files.photo[0]) {
                finalPhotoUrl = `${protocol}://${host}/uploads/${req.files.photo[0].filename}`;
            }
            if (req.files.audio && req.files.audio[0]) {
                finalAudioUrl = `${protocol}://${host}/uploads/${req.files.audio[0].filename}`;
            }
        }

        if (!name || !gender) {
            return res.status(400).json({ error: 'Name and Gender are required' });
        }

        if (!finalAudioUrl && !message) {
            return res.status(400).json({ error: 'Testimonial Audio (or message) is required' });
        }

        const newRef = db.ref('testimonials').push();
        await newRef.set({
            name,
            post: post || '',
            gender,
            message: message || '',
            photoUrl: finalPhotoUrl,
            audioUrl: finalAudioUrl,
            createdAt: new Date().toISOString()
        });

        res.json({ success: true, message: 'Testimonial added successfully', id: newRef.key });
    } catch (error) {
        console.error('Error adding testimonial:', error);
        res.status(500).json({ error: 'Failed to add testimonial' });
    }
});

// DELETE /api/testimonials/:id - Delete a testimonial (Admin)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await db.ref(`testimonials/${id}`).remove();
        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

export default router;
