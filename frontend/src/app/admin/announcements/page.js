'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaBullhorn, FaTrash, FaPlus, FaTimes, FaPen, FaSpinner } from 'react-icons/fa';
import TiltCard from '../../../components/TiltCard';
import Toast from '../../../components/Toast';
import ConfirmModal from '../../../components/ConfirmModal';

export default function ManageAnnouncementsPage() {
    const [loading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Toast State
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'news' // news, update, alert
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                const res = await fetch(`${backendUrl}/admin/check-auth`, {
                    credentials: 'include'
                });
                if (!res.ok) {
                    router.push('/admin/login');
                } else {
                    fetchAnnouncements();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router]);

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
            setToast({ message: 'Failed to fetch announcements', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (announcement) => {
        setFormData({
            title: announcement.title,
            content: announcement.content,
            type: announcement.type || 'news'
        });
        setEditMode(true);
        setEditId(announcement.id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

            let url = `${backendUrl}/api/announcements`;
            let method = 'POST';

            if (editMode && editId) {
                url = `${backendUrl}/api/announcements/${editId}`;
                method = 'PUT';
            }

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (res.ok) {
                await fetchAnnouncements();
                setShowForm(false);
                setFormData({ title: '', content: '', type: 'news' });
                setEditMode(false);
                setEditId(null);
                setToast({
                    message: `Announcement ${editMode ? 'updated' : 'published'} successfully!`,
                    type: 'success'
                });
            } else {
                setToast({ message: 'Failed to save announcement', type: 'error' });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setToast({ message: 'An error occurred', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/announcements/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setAnnouncements(prev => prev.filter(a => a.id !== deleteId));
                setToast({ message: 'Announcement deleted', type: 'success' });
            } else {
                const data = await res.json();
                setToast({ message: data.error || 'Failed to delete announcement', type: 'error' });
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
            setToast({ message: 'Error deleting announcement', type: 'error' });
        } finally {
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-500">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative">
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: 'success' })}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Announcement"
                message="Are you sure you want to delete this announcement? This action cannot be undone."
            />

            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 py-4 border-b border-white/5">
                <div>
                    <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition-colors">
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                        Manage Announcements
                    </h1>
                </div>
                <button
                    onClick={() => {
                        setEditMode(false);
                        setFormData({ title: '', content: '', type: 'news' });
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-amber-500/20"
                >
                    <FaPlus /> Post Announcement
                </button>
            </header>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <AnimatePresence>
                    {announcements.map((a, index) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <TiltCard spotlight={true} spotlightColor="rgba(245, 158, 11, 0.1)">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col relative group hover:border-amber-500/30 transition-all">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEdit(a); }}
                                            className="text-gray-400 hover:text-white p-2 bg-black/50 rounded-lg hover:bg-white/10"
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(a.id); }}
                                            className="text-gray-400 hover:text-red-500 p-2 bg-black/50 rounded-lg hover:bg-red-500/10"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${a.type === 'alert' ? 'bg-red-500/20 text-red-500' :
                                            a.type === 'update' ? 'bg-blue-500/20 text-blue-500' :
                                                'bg-amber-500/20 text-amber-500'
                                            }`}>
                                            <FaBullhorn />
                                        </div>
                                        <div>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${a.type === 'alert' ? 'text-red-500' :
                                                a.type === 'update' ? 'text-blue-500' :
                                                    'text-amber-500'
                                                }`}>
                                                {a.type}
                                            </span>
                                            <p className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {a.title && <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>}

                                    <div className="bg-black/30 rounded-lg p-4 flex-1 border border-white/5 overflow-hidden">
                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{a.content}</p>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowForm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-2xl shadow-amber-500/10"
                        >
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <FaBullhorn className="text-amber-500 text-lg" /> {editMode ? 'Edit Announcement' : 'Post Announcement'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                    >
                                        <option value="news">News</option>
                                        <option value="update">Platform Update</option>
                                        <option value="alert">Critical Alert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Title (Optional)</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                        placeholder="Headline..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Content <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                        placeholder="Enter announcement details..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                                >
                                    {submitting ? <FaSpinner className="animate-spin" /> : (editMode ? 'Update Announcement' : 'Publish Announcement')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
