import express from 'express';
import { getDatabase } from 'firebase-admin/database';
import firebaseApp from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();
const db = getDatabase(firebaseApp);

// Reusing JWT Secret
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'super-secret-admin-key-change-this';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port for other providers
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware to verify admin token (duplicated for safety/speed)
const verifyAdmin = (req, res, next) => {
    const token = req.cookies?.admin_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('verifyAdmin failed: No token found. Cookies:', req.cookies);
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        console.log('verifyAdmin failed: Invalid token:', error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// --- Public Routes ---

// GET /api/jobs - List all active jobs
router.get('/', async (req, res) => {
    try {
        const jobsRef = db.ref('jobs');
        const snapshot = await jobsRef.once('value');
        const jobs = snapshot.val() || {};

        // Convert to array
        const jobsList = Object.keys(jobs).map(key => ({
            id: key,
            ...jobs[key]
        })).reverse(); // Newest first

        res.json({ success: true, jobs: jobsList });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// GET /api/jobs/:id - Get single job details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const jobRef = db.ref(`jobs/${id}`);
        const snapshot = await jobRef.once('value');

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json({ success: true, job: { id, ...snapshot.val() } });
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// POST /api/jobs/:id/apply - Submit application
router.post('/:id/apply', async (req, res) => {
    try {
        const { id } = req.params;
        const applicationData = req.body;

        // Check if job is active
        const jobSnapshot = await db.ref(`jobs/${id}`).once('value');
        if (!jobSnapshot.exists()) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const job = jobSnapshot.val();
        if (!job.isActive && !req.admin) { // Admin can apply? No, admins don't apply. Just check !job.isActive
            return res.status(400).json({ error: 'This job is no longer accepting applications' });
        }

        // Basic validation
        const requiredFields = ['name', 'email', 'phone', 'qualification', 'skills', 'experience'];
        for (const field of requiredFields) {
            if (!applicationData[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        // Normalize email
        applicationData.email = applicationData.email.toLowerCase();

        // Check for duplicate application (Email or Phone)
        const appsRef = db.ref(`applications/${id}`);

        console.log(`Checking duplicates for Job ${id}: Email ${applicationData.email}, Phone ${applicationData.phone}`);

        // Parallel queries for email and phone
        const [emailSnapshot, phoneSnapshot] = await Promise.all([
            appsRef.orderByChild('email').equalTo(applicationData.email).once('value'),
            appsRef.orderByChild('phone').equalTo(applicationData.phone).once('value')
        ]);

        console.log(`Duplicate Results - Email: ${emailSnapshot.exists()}, Phone: ${phoneSnapshot.exists()}`);

        if (emailSnapshot.exists()) {
            return res.status(400).json({ error: 'You have already applied for this job with this Email ID.' });
        }
        if (phoneSnapshot.exists()) {
            return res.status(400).json({ error: 'You have already applied for this job with this Phone Number.' });
        }

        const applicationRef = db.ref(`applications/${id}`).push();
        await applicationRef.set({
            ...applicationData,
            jobId: id,
            appliedAt: new Date().toISOString(),
            status: 'pending'
        });

        // Send Confirmation Email
        try {
            await transporter.sendMail({
                from: `"Supe AI Careers" <${process.env.EMAIL_USER}>`,
                to: applicationData.email,
                subject: `Application Received: ${job.title}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                        <h2 style="color: #06b6d4;">Application Received</h2>
                        <p>Dear ${applicationData.name},</p>
                        <p>Thank you for applying for the position of <strong>${job.title}</strong> at Supe AI.</p>
                        <p>We have successfully received your application. Our HR team will review your qualifications and experience.</p>
                        <p>If your profile matches our requirements, we will contact you shortly to schedule an interview.</p>
                        <br>
                        <p>Best Regards,</p>
                        <p><strong>Supe AI HR Team</strong></p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">This is an automated email. Please do not reply directly to this address.</p>
                    </div>
                `
            });
            console.log(`Confirmation email sent to ${applicationData.email}`);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't block the response, just log the error
        }

        res.json({ success: true, message: 'Application submitted successfully' });

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// --- Admin Routes ---

// POST /api/jobs - Create a new job
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const jobData = req.body;

        // Basic validation
        if (!jobData.title || !jobData.description) {
            return res.status(400).json({ error: 'Title and Description are required' });
        }

        const jobsRef = db.ref('jobs').push();
        await jobsRef.set({
            ...jobData,
            createdAt: new Date().toISOString(),
            isActive: true
        });

        res.json({ success: true, message: 'Job posted successfully', jobId: jobsRef.key });

    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ error: 'Failed to post job' });
    }
});

// GET /api/jobs/applications/all - Get all applications (Admin)
router.get('/applications/all', verifyAdmin, async (req, res) => {
    try {
        // Fetch all applications
        // Structure: applications/{jobId}/{appId}
        const appsRef = db.ref('applications');
        const snapshot = await appsRef.once('value');
        const data = snapshot.val() || {};

        let allApps = [];
        const jobsSnapshot = await db.ref('jobs').once('value');
        const jobs = jobsSnapshot.val() || {};

        Object.keys(data).forEach(jobId => {
            const jobApps = data[jobId];
            const jobTitle = jobs[jobId]?.title || 'Unknown Job';

            Object.keys(jobApps).forEach(appId => {
                allApps.push({
                    id: appId,
                    jobId,
                    jobTitle,
                    ...jobApps[appId]
                });
            });
        });

        // Sort by date desc
        allApps.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

        res.json({ success: true, applications: allApps });

    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// DELETE /api/jobs/applications/:jobId/:appId - Delete an application
router.delete('/applications/:jobId/:appId', verifyAdmin, async (req, res) => {
    try {
        const { jobId, appId } = req.params;
        await db.ref(`applications/${jobId}/${appId}`).remove();
        res.json({ success: true, message: 'Application deleted' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await db.ref(`jobs/${id}`).remove();
        // and its applications?
        await db.ref(`applications/${id}`).remove();
        res.json({ success: true, message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

// PATCH /api/jobs/:id/status - Toggle job active status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'isActive must be a boolean' });
        }

        await db.ref(`jobs/${id}`).update({ isActive });
        res.json({ success: true, message: `Job marked as ${isActive ? 'active' : 'expired'}` });
    } catch (error) {
        console.error('Error updating job status:', error);
        res.status(500).json({ error: 'Failed to update job status' });
    }
});

export default router;
