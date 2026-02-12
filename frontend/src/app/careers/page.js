'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import LiveBackground from '../../components/LiveBackground';
import TiltCard from '../../components/TiltCard';
import { FaBriefcase, FaClock, FaMoneyBillWave, FaMapMarkerAlt, FaSearch, FaArrowRight, FaTimes, FaLinkedin, FaGithub, FaSpinner } from 'react-icons/fa';

export default function CareersPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null); // For modal apply
    const [applicationForm, setApplicationForm] = useState({
        name: '',
        phone: '',
        email: '',
        qualification: '',
        experience: '', // Added experience
        skills: '',
        linkedin: '',
        github: '',
        description: '' // Comment section
    });
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                const res = await fetch(`${backendUrl}/api/jobs`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        // Filter active jobs only (allow jobs without isActive property for backward compatibility)
                        const activeJobs = data.jobs.filter(job => job.isActive !== false);
                        setJobs(activeJobs);
                    } else {
                        setJobs([]); // If success is false, set jobs to empty
                    }
                } else {
                    setJobs([]); // If res is not ok, set jobs to empty
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobs([]); // On error, set jobs to empty
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
        document.body.style.overflow = 'auto';
        setApplicationForm({
            name: '',
            phone: '',
            email: '',
            qualification: '',
            experience: '',
            skills: '',
            linkedin: '',
            github: '',
            description: ''
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setApplicationForm(prev => ({ ...prev, [name]: value }));
    };



    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        setApplying(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs/${selectedJob.id}/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationForm)
            });

            if (res.ok) {
                showNotification('Application Submitted! We will contact you via Phone call or Gmail for the next steps.', 'success');
                handleCloseModal();
            } else {
                const data = await res.json();
                showNotification(data.error || 'Failed to submit application', 'error');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-cyan-500/30">
            <Navbar />

            {/* Notification Toast */}
            <div className="fixed top-24 left-0 right-0 z-[60] flex justify-center pointer-events-none px-4">
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`pointer-events-auto px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 backdrop-blur-md max-w-md text-center ${notification.type === 'success'
                                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                : 'bg-red-500/20 border-red-500/50 text-red-400'
                                }`}
                        >
                            {notification.type === 'success' ? (
                                <div className="p-1 bg-green-500/20 rounded-full shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="p-1 bg-red-500/20 rounded-full shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )}
                            <span className="font-medium text-sm md:text-base">{notification.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <LiveBackground src="/images/hero-bg-1.webp" opacity={0.4} blur="blur-sm" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <main className="relative z-10 pt-32 pb-20 container mx-auto px-4 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6 drop-shadow-lg p-2">
                            Join Our Revolution
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
                            Help us build the next generation of enterprise AI. Explore opportunities to innovate, lead, and grow.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-xl mx-auto relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500 text-lg group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by role, skill, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 backdrop-blur-xl transition-all shadow-lg"
                        />
                    </motion.div>
                </div>

                {/* Job Listings */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {jobs.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-gray-500">
                                    <p className="text-xl">No open positions currently.</p>
                                    <p className="text-sm mt-2">We are not hiring at the moment, but please check back later!</p>
                                </div>
                            ) : filteredJobs.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-gray-500">
                                    <p className="text-xl">No active positions matching your search.</p>
                                    <p className="text-sm mt-2">Check back later or try adjusting your filters.</p>
                                </div>
                            ) : (
                                filteredJobs.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.1 }}
                                        layout
                                    >
                                        <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.15)">
                                            <div className="h-full bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all flex flex-col justify-between group backdrop-blur-md">
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <span className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/20 font-medium">
                                                            {job.employmentType}
                                                        </span>
                                                        <span className="text-gray-500 text-xs flex items-center gap-1">
                                                            <FaClock /> Listed recently
                                                        </span>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                                        {job.title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                                                        <span className="flex items-center gap-1.5">
                                                            <FaMapMarkerAlt className="text-cyan-500" /> {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <FaMoneyBillWave className="text-green-500" /> {job.salaryRange}
                                                        </span>
                                                    </div>

                                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                                        {job.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {job.skills.split(',').slice(0, 3).map((skill, i) => (
                                                            <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/5">
                                                                {skill.trim()}
                                                            </span>
                                                        ))}
                                                        {job.skills.split(',').length > 3 && (
                                                            <span className="text-xs text-gray-500 px-2 py-1">+{job.skills.split(',').length - 3} more</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleApplyClick(job)}
                                                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20 border border-white/10 hover:border-transparent flex items-center justify-center gap-2"
                                                >
                                                    Apply Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </TiltCard>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            {/* Application Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
                                    <p className="text-gray-400 text-sm">{selectedJob.location} • {selectedJob.employmentType}</p>
                                </div>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleApplySubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={applicationForm.name}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Email Address <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={applicationForm.email}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={applicationForm.phone}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Qualification <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={applicationForm.qualification}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="Degree / Certification"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Experience (Years) <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={applicationForm.experience}
                                            onChange={handleFormChange}
                                            min="0"
                                            step="0.1"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="e.g. 2.5"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Skills <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="skills"
                                        value={applicationForm.skills}
                                        onChange={handleFormChange}
                                        rows="3"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                        placeholder="Detailed list of your technical skills..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium"><FaLinkedin className="inline mr-1 text-[#0077b5]" /> LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={applicationForm.linkedin}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium"><FaGithub className="inline mr-1" /> GitHub Profile</label>
                                        <input
                                            type="url"
                                            name="github"
                                            value={applicationForm.github}
                                            onChange={handleFormChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Candidate Comments / Cover Letter</label>
                                    <textarea
                                        name="description"
                                        value={applicationForm.description}
                                        onChange={handleFormChange}
                                        rows="5"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                        placeholder="Tell us why you're a great fit..."
                                    />
                                </div>

                                <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={applying}
                                        className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
                                    >
                                        {applying && <FaSpinner className="animate-spin" />}
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
