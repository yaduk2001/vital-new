'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaBriefcase, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaSpinner, FaTrash, FaUser, FaClock, FaGraduationCap, FaCode } from 'react-icons/fa';
import TiltCard from '../../../components/TiltCard';

export default function ApplicationsPage() {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState('All');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs/applications/all`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setApplications(data.applications || []);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (app) => {
        if (!confirm(`Are you sure you want to delete the application from ${app.name}?`)) return;

        setDeletingId(app.id);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs/applications/${app.jobId}/${app.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setApplications(prev => prev.filter(a => a.id !== app.id));
            } else {
                alert('Failed to delete application');
            }
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('An error occurred while deleting');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredApps = selectedJob === 'All'
        ? applications
        : applications.filter(app => app.jobTitle === selectedJob);

    const uniqueJobs = ['All', ...new Set(applications.map(app => app.jobTitle))];

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 py-4 border-b border-white/5">
                <div>
                    <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition-colors">
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Job Applications
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Applications: {applications.length} {filteredApps.length !== applications.length && `(Showing ${filteredApps.length})`}
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBriefcase className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <select
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-500/50 appearance-none min-w-[250px] cursor-pointer hover:bg-white/10 transition-colors"
                    >
                        {uniqueJobs.map(job => (
                            <option key={job} value={job} className="bg-gray-900">{job}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
                <AnimatePresence>
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app, index) => (
                            <motion.div
                                key={app.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.05)">
                                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all">

                                        {/* Header Bar */}
                                        <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex flex-wrap justify-between items-center gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 text-cyan-400 font-medium mb-1">
                                                    <FaBriefcase className="text-sm" /> {app.jobTitle}
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                                    <FaClock /> Applied: {new Date(app.appliedAt).toLocaleString()}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(app)}
                                                disabled={deletingId === app.id}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm transition-colors border border-red-500/20"
                                            >
                                                {deletingId === app.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                                Delete
                                            </button>
                                        </div>

                                        <div className="p-6 flex flex-col md:flex-row gap-8">
                                            {/* Left Column: Personal Info */}
                                            <div className="flex-1 md:max-w-xs space-y-4 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6">
                                                <div>
                                                    <div className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                                                        <FaUser className="text-gray-600 text-base" /> {app.name}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <a href={`mailto:${app.email}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors group">
                                                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                                                            <FaEnvelope />
                                                        </div>
                                                        <span className="truncate">{app.email}</span>
                                                    </a>
                                                    <a href={`tel:${app.phone}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors group">
                                                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                                            <FaPhone />
                                                        </div>
                                                        <span>{app.phone}</span>
                                                    </a>
                                                </div>

                                                <div className="flex gap-2 pt-2">
                                                    {app.linkedin && (
                                                        <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-[#0077b5] rounded-lg text-sm transition-colors border border-[#0077b5]/20">
                                                            <FaLinkedin className="inline mr-1" /> LinkedIn
                                                        </a>
                                                    )}
                                                    {app.github && (
                                                        <a href={app.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors border border-white/10">
                                                            <FaGithub className="inline mr-1" /> GitHub
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right Column: Details */}
                                            <div className="flex-[2] space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                                        <div className="text-xs uppercase text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                            <FaGraduationCap /> Qualification
                                                        </div>
                                                        <div className="text-white font-medium">{app.qualification}</div>
                                                    </div>

                                                    {/* Experience Display - HIGHLY VISIBLE */}
                                                    <div className="bg-gradient-to-br from-cyan-900/20 to-black/20 rounded-xl p-4 border border-cyan-500/20">
                                                        <div className="text-xs uppercase text-cyan-500 font-bold mb-2 flex items-center gap-2">
                                                            <FaBriefcase /> Experience
                                                        </div>
                                                        <div className="text-xl font-bold text-white">
                                                            {app.experience ? `${app.experience} Years` : <span className="text-gray-600 text-sm font-normal">Not specified</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-xs uppercase text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                        <FaCode /> Skills
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(app.skills?.split ? app.skills.split(',') : [app.skills || '']).map((skill, i) => (
                                                            <span key={i} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                                                                {typeof skill === 'string' ? skill.trim() : skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {app.description && (
                                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                                        <div className="text-xs uppercase text-gray-500 font-bold mb-2">Cover Letter / Comments</div>
                                                        <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                                            {app.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                            <FaBriefcase className="text-4xl mx-auto mb-4 opacity-20" />
                            <p>No applications found in this category.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
