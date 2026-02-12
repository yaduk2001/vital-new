'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt, FaExclamationTriangle, FaNewspaper, FaRocket, FaSpinner } from 'react-icons/fa';
import TiltCard from '../../components/TiltCard';
import Navbar from '../../components/Navbar';

export default function AnnouncementsPage() {
    const [loading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                const res = await fetch(`${backendUrl}/api/announcements`);
                if (res.ok) {
                    const data = await res.json();
                    setAnnouncements(data.announcements || []);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'alert': return <FaExclamationTriangle className="text-red-500" />;
            case 'update': return <FaRocket className="text-blue-500" />;
            default: return <FaNewspaper className="text-amber-500" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'alert': return 'text-red-500 border-red-500/20 bg-red-500/10';
            case 'update': return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
            default: return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black flex items-center justify-center text-amber-500">
                <FaSpinner className="animate-spin text-4xl" />
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F0F0F] to-[#0A0F1A] text-white pt-24 px-4 md:px-8 relative">
                <div className="max-w-4xl mx-auto min-h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 mb-4">
                            Latest Announcements
                        </h1>
                        <p className="text-gray-400 text-lg">Stay updated with the latest news, updates, and alerts from Supe AI.</p>
                    </motion.div>

                    {announcements.length === 0 ? (
                        <div className="text-center text-gray-500 py-12 bg-white/5 rounded-2xl border border-white/10">
                            <FaBullhorn className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>No announcements yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {announcements.map((a, index) => (
                                <motion.div
                                    key={a.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <TiltCard spotlight={true} spotlightColor="rgba(245, 158, 11, 0.05)">
                                        <div className="bg-gradient-to-br from-white/5 to-black border border-white/10 rounded-2xl p-6 md:p-8 hover:border-amber-500/30 transition-all relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                {getTypeIcon(a.type)}
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getTypeColor(a.type)} text-2xl`}>
                                                        {getTypeIcon(a.type)}
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${getTypeColor(a.type)}`}>
                                                            {a.type}
                                                        </span>
                                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FaCalendarAlt /> {new Date(a.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </span>
                                                    </div>

                                                    {a.title && <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{a.title}</h2>}

                                                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                        {a.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Simple Footer */}
                <footer className="py-12 border-t border-white/10 mt-20 text-center">
                    <div className="container mx-auto px-4">
                        <p className="text-gray-500 text-sm">
                            © 2024 Supe AI. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
