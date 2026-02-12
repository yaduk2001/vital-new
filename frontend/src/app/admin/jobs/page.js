'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaBriefcase, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaSpinner, FaUsers, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa';
import TiltCard from '../../../components/TiltCard';

export default function ManageJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, expired
    const router = useRouter();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs`);
            const data = await res.json();
            if (data.success) {
                setJobs(data.jobs || []);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleJobStatus = async (jobId, currentStatus) => {
        // Optimistic update
        const updatedJobs = jobs.map(job =>
            job.id === jobId ? { ...job, isActive: !currentStatus } : job
        );
        setJobs(updatedJobs);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs/${jobId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus }),
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            // Revert on error
            setJobs(jobs);
            alert('Failed to update job status');
        }
    };

    const deleteJob = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job posting? This cannot be undone.')) return;

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs/${jobId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setJobs(jobs.filter(job => job.id !== jobId));
            } else {
                alert('Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Error deleting job');
        }
    };

    const filteredJobs = jobs.filter(job => {
        if (filter === 'active') return job.isActive !== false;
        if (filter === 'expired') return job.isActive === false;
        return true;
    });

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <header className="mb-8">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
                    <FaArrowLeft /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Manage Jobs
                    </h1>
                    <Link href="/admin/jobs/new" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <FaBriefcase /> Post New Job
                    </Link>
                </div>
            </header>

            {/* Filters */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {['all', 'active', 'expired'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)} ({
                            jobs.filter(j =>
                                f === 'all' ? true : f === 'active' ? j.isActive !== false : j.isActive === false
                            ).length
                        })
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-cyan-500" />
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <FaBriefcase className="text-4xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No jobs found matching your filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredJobs.map((job) => (
                            <motion.div
                                key={job.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.1)">
                                    <div className={`h-full border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm transition-colors ${job.isActive === false
                                            ? 'bg-red-900/10 border-red-500/20'
                                            : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                                        }`}>
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${job.isActive === false
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    }`}>
                                                    {job.isActive === false ? 'Expired' : 'Active'}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => deleteJob(job.id)}
                                                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                                        title="Delete Job"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{job.title}</h3>

                                            <div className="space-y-2 text-sm text-gray-400 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="text-cyan-500" />
                                                    <span>{job.employmentType}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-cyan-500" />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaUsers className="text-cyan-500" />
                                                    <span>{job.experience}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaMoneyBillWave className="text-green-500" />
                                                    <span>{job.salaryRange}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <button
                                                onClick={() => toggleJobStatus(job.id, job.isActive !== false)}
                                                className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${job.isActive === false
                                                        ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20'
                                                        : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                                                    }`}
                                            >
                                                {job.isActive === false ? (
                                                    <>
                                                        <FaToggleOn /> Mark as Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaToggleOff /> Mark as Expired
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
