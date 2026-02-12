'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaBriefcase, FaMoneyBillWave, FaMapMarkerAlt, FaGraduationCap, FaClock, FaSpinner } from 'react-icons/fa';
import TiltCard from '../../../../components/TiltCard';

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        experience: '',
        qualification: '',
        skills: '',
        location: '',
        salaryRange: '',
        employmentType: 'Full-time',
        description: ''
    });

    const [notification, setNotification] = useState(null);

    const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (res.ok) {
                showNotification('Job posted successfully!', 'success');
                setTimeout(() => router.push('/admin/dashboard'), 1500);
            } else {
                const data = await res.json();
                console.error('Server Error:', data);
                showNotification(data.error || `Failed to post job (Status: ${res.status})`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(`An error occurred: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative">
            {/* Notification Toast */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: notification ? 1 : 0, y: notification ? 0 : -20 }}
                    className={`pointer-events-auto px-6 py-3 rounded-full shadow-2xl border flex items-center gap-3 backdrop-blur-md ${notification?.type === 'success'
                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                            : 'bg-red-500/20 border-red-500/50 text-red-400'
                        }`}
                >
                    {notification?.type === 'success' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    <span className="font-medium">{notification?.message}</span>
                </motion.div>
            </div>

            <header className="mb-8">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
                    <FaArrowLeft /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    Post New Job
                </h1>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.1)">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Job Title</label>
                                    <div className="relative">
                                        <FaBriefcase className="absolute left-3 top-3 text-gray-500" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                            placeholder="e.g. Senior React Developer"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Employment Type</label>
                                    <div className="relative">
                                        <FaClock className="absolute left-3 top-3 text-gray-500" />
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 appearance-none"
                                        >
                                            {employmentTypes.map(type => (
                                                <option key={type} value={type} className="bg-gray-900">{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Experience Required</label>
                                    <div className="relative">
                                        <FaBriefcase className="absolute left-3 top-3 text-gray-500" />
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                            placeholder="e.g. 3-5 Years"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Location</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                            placeholder="e.g. Remote / New York"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Salary Range</label>
                                    <div className="relative">
                                        <FaMoneyBillWave className="absolute left-3 top-3 text-gray-500" />
                                        <input
                                            type="text"
                                            name="salaryRange"
                                            value={formData.salaryRange}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                            placeholder="e.g. 10 LPA - 15 LPA"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Qualifications</label>
                                    <div className="relative">
                                        <FaGraduationCap className="absolute left-3 top-3 text-gray-500" />
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                            placeholder="e.g. Bachelors in CS"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Required Skills</label>
                                <textarea
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500/50"
                                    placeholder="e.g. React, Node.js, Firebase, AWS (Comma separated)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Job Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500/50"
                                    placeholder="Detailed job description..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {loading && <FaSpinner className="animate-spin" />}
                                Post Job
                            </button>
                        </form>
                    </div>
                </TiltCard>
            </motion.div>
        </div>
    );
}
