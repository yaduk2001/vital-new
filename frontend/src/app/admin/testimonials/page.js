'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaStar, FaTrash, FaPlus, FaTimes, FaUser, FaBriefcase, FaVenusMars, FaImage, FaSpinner, FaUpload, FaMicrophone, FaMusic, FaEdit, FaPlay, FaPause } from 'react-icons/fa';
import TiltCard from '../../../components/TiltCard';
import Toast from '../../../components/Toast';
import ConfirmModal from '../../../components/ConfirmModal';

export default function TestimonialsPage() {
    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        post: '',
        gender: 'male',
        message: '',
        photoUrl: ''
    });
    const [file, setFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [existingAudioUrl, setExistingAudioUrl] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
                    fetchTestimonials();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router]);

    const fetchTestimonials = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/testimonials`);
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data.testimonials || []);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setToast({ message: 'Failed to load testimonials', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAudioChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAudioFile(e.target.files[0]);
        }
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEdit = (t) => {
        setFormData({
            name: t.name,
            post: t.post || '',
            gender: t.gender,
            message: t.message || '',
            photoUrl: t.photoUrl || ''
        });
        setExistingAudioUrl(t.audioUrl || null);
        setEditingId(t.id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('post', formData.post);
            submitData.append('gender', formData.gender);
            if (formData.message) submitData.append('message', formData.message);
            if (formData.photoUrl !== undefined) submitData.append('photoUrl', formData.photoUrl);
            if (file) submitData.append('photo', file);
            if (audioFile) submitData.append('audio', audioFile);

            const url = editingId
                ? `${backendUrl}/api/testimonials/${editingId}`
                : `${backendUrl}/api/testimonials`;

            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                body: submitData,
                credentials: 'include'
            });

            if (res.ok) {
                await fetchTestimonials();
                setShowForm(false);
                setFormData({
                    name: '',
                    post: '',
                    gender: 'male',
                    message: '',
                    photoUrl: ''
                });
                setFile(null);
                setAudioFile(null);
                setFile(null);
                setAudioFile(null);
                setExistingAudioUrl(null);
                setIsPlaying(false);
                setEditingId(null);
                setToast({ message: editingId ? 'Testimonial updated!' : 'Testimonial added successfully!', type: 'success' });
            } else {
                const data = await res.json();
                setToast({ message: data.error || 'Failed to save testimonial', type: 'error' });
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
            const res = await fetch(`${backendUrl}/api/testimonials/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setTestimonials(prev => prev.filter(t => t.id !== deleteId));
                setToast({ message: 'Testimonial deleted', type: 'success' });
            } else {
                const data = await res.json();
                setToast({ message: data.error || 'Failed to delete testimonial', type: 'error' });
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            setToast({ message: 'Error deleting item', type: 'error' });
        } finally {
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
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
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial? This action cannot be undone."
            />

            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 py-4 border-b border-white/5">
                <div>
                    <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition-colors">
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
                        Manage Testimonials
                    </h1>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', post: '', gender: 'male', message: '', photoUrl: '' });
                        setExistingAudioUrl(null);
                        setIsPlaying(false);
                        setFile(null);
                        setAudioFile(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-pink-500/20"
                >
                    <FaPlus /> Add New
                </button>
            </header>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <AnimatePresence>
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <TiltCard spotlight={true} spotlightColor="rgba(236, 72, 153, 0.1)">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col relative group hover:border-pink-500/30 transition-all">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 z-10 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(t)}
                                            className="text-gray-500 hover:text-blue-400 transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="text-gray-500 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                                                {t.photoUrl ? (
                                                    <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img
                                                        src={`https://avatar.iran.liara.run/public/${t.gender === 'female' ? 'girl' : 'boy'}?username=${t.name}`}
                                                        alt={t.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{t.name}</h3>
                                            <p className="text-xs text-pink-400 uppercase tracking-wider">{t.post || 'Client'}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/30 rounded-lg p-4 flex-1 border border-white/5 flex flex-col justify-center">
                                        {t.audioUrl ? (
                                            <div className="w-full">
                                                <div className="flex items-center gap-2 mb-2 text-xs text-pink-400 uppercase tracking-wider font-bold">
                                                    <FaMicrophone /> Audio Feedback
                                                </div>
                                                <audio controls src={t.audioUrl} className="w-full h-8 custom-audio" />
                                                {t.message && <p className="text-gray-400 text-xs mt-2 italic">&quot;{t.message}&quot;</p>}
                                            </div>
                                        ) : (
                                            <>
                                                <FaStar className="text-yellow-500 mb-2 text-xs" />
                                                <p className="text-gray-300 text-sm italic leading-relaxed">&quot;{t.message}&quot;</p>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                                        <span>{t.gender === 'male' ? 'Male' : 'Female'}</span>
                                        <span>{new Date(t.createdAt).toLocaleDateString()}</span>
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
                            className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-2xl shadow-pink-500/10 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                {editingId ? <FaEdit className="text-pink-500 text-lg" /> : <FaPlus className="text-pink-500 text-lg" />}
                                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-3.5 text-gray-500" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-colors"
                                            placeholder="Client Name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Post / Role</label>
                                        <div className="relative">
                                            <FaBriefcase className="absolute left-3 top-3.5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="post"
                                                value={formData.post}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-colors"
                                                placeholder="CEO, Developer..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2 font-medium">Gender <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <FaVenusMars className="absolute left-3 top-3.5 text-gray-500" />
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-colors appearance-none"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Photo Upload or URL */}
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Photo (Upload or URL)</label>
                                    <div className="flex gap-4 mb-2">
                                        <div className="relative flex-1">
                                            <FaUpload className="absolute left-3 top-3.5 text-gray-500" />
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-pink-500 focus:outline-none file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <FaImage className="absolute left-3 top-3.5 text-gray-500" />
                                        <input
                                            type="url"
                                            name="photoUrl"
                                            value={formData.photoUrl}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-colors"
                                            placeholder="Image URL (optional)"
                                        />
                                    </div>
                                </div>

                                {/* Audio Upload - Primary Content */}
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Audio Callback <span className="text-red-500">*</span></label>

                                    {existingAudioUrl && (
                                        <div className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                                                    <FaMusic className="text-xs" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase font-bold">Current Audio</p>
                                                    <p className="text-xs text-green-400">File attached</p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={toggleAudio}
                                                className="w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center text-white transition-all shadow-lg shadow-pink-500/20 active:scale-95"
                                            >
                                                {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
                                            </button>
                                            <audio ref={audioRef} src={existingAudioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
                                        </div>
                                    )}

                                    <div className="relative mb-2">
                                        <FaMicrophone className="absolute left-3 top-3.5 text-gray-500" />
                                        <input
                                            type="file"
                                            name="audio"
                                            onChange={handleAudioChange}
                                            accept="audio/*"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-pink-500 focus:outline-none file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20"
                                            required={!formData.message && !existingAudioUrl} // Required if no message provided AND no existing audio
                                        />
                                    </div>
                                    {existingAudioUrl && <p className="text-[10px] text-gray-500 pl-1">* Upload new file to replace existing audio</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">Short Description (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-colors"
                                        placeholder="Brief transcript or summary..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
                                >
                                    {submitting ? <FaSpinner className="animate-spin" /> : (editingId ? 'Update Testimonial' : 'Post Testimonial')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
