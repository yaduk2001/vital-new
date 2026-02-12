'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaUsers, FaUserPlus, FaUserCheck, FaUserTimes, FaTrash, FaSignOutAlt, FaSearch, FaEllipsisH, FaChartLine, FaArrowLeft, FaSpinner, FaBriefcase, FaArrowRight, FaEnvelope, FaStar, FaBullhorn } from 'react-icons/fa';
import TiltCard from '../../../components/TiltCard';

// Mock components if needed, or imported
const StatsCard = ({ title, value, icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex-1 min-w-[200px]"
    >
        <TiltCard spotlight={true} spotlightColor={`rgba(${color}, 0.1)`} className="h-full">
            <div className={`h-full bg-black/60 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all relative overflow-hidden group`}>
                <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity text-${color}-400`}>
                    {icon}
                </div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
                <p className="text-3xl font-bold text-white">{value}</p>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-600 to-transparent`} />
            </div>
        </TiltCard>
    </motion.div>
);

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, newUsersToday: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    const fetchUsers = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/admin/users`, {
                credentials: 'include' // Must include cookies
            });
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/admin/stats`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    useEffect(() => {
        // Initial load
        Promise.all([fetchUsers(), fetchStats()]).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            await fetch(`${backendUrl}/admin/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleUserStatus = async (uid, currentStatus) => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/admin/users/${uid}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ disabled: !currentStatus }),
                credentials: 'include'
            });

            if (res.ok) {
                // Optimistic update
                setUsers(users.map(u => u.uid === uid ? { ...u, disabled: !currentStatus } : u));
                fetchStats(); // Update stats
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const deleteUser = async (uid) => {
        if (!confirm('Are you certain? This action cannot be undone.')) return;

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/admin/users/${uid}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setUsers(users.filter(u => u.uid !== uid));
                fetchStats();
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <FaSpinner className="animate-spin text-4xl text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 mb-2 transition-colors text-sm">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage users and monitoring system
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-white">Administrator</div>
                        <div className="text-xs text-gray-500">admin@supeai.com</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-xl transition-colors border border-white/10"
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<FaUsers className="text-2xl" />}
                    color="255, 255, 255"
                    delay={0.1}
                />
                <StatsCard
                    title="Active Now"
                    value={stats.activeUsers}
                    icon={<FaUserCheck className="text-2xl" />}
                    color="34, 197, 94"
                    delay={0.2}
                />
                <StatsCard
                    title="New Today"
                    value={stats.newUsersToday}
                    icon={<FaUserPlus className="text-2xl" />}
                    color="59, 130, 246"
                    delay={0.3}
                />
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Link href="/admin/jobs/new">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 rounded-2xl p-6 cursor-pointer hover:border-cyan-400/50 transition-all group aspect-square flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    <FaBriefcase className="text-2xl" />
                                </div>
                                <FaArrowRight className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Post New Job</h3>
                                <p className="text-gray-400 text-sm">Create a new job listing for the careers page.</p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/jobs">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-2xl p-6 cursor-pointer hover:border-blue-400/50 transition-all group aspect-square flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <FaBriefcase className="text-2xl" />
                                </div>
                                <FaArrowRight className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Manage Jobs</h3>
                                <p className="text-gray-400 text-sm">View, edit, and toggle status of posted jobs.</p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/applications">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 rounded-2xl p-6 cursor-pointer hover:border-purple-400/50 transition-all group aspect-square flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <FaEnvelope className="text-2xl" />
                                </div>
                                <FaArrowRight className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">View Applications</h3>
                                <p className="text-gray-400 text-sm">Review candidate applications and resumes.</p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/testimonials">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-pink-900/40 to-black border border-pink-500/30 rounded-2xl p-6 cursor-pointer hover:border-pink-400/50 transition-all group aspect-square flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                    <FaStar className="text-2xl" />
                                </div>
                                <FaArrowRight className="text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Testimonials</h3>
                                <p className="text-gray-400 text-sm">Manage client feedback and success stories.</p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/announcements">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/30 rounded-2xl p-6 cursor-pointer hover:border-amber-400/50 transition-all group aspect-square flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <FaBullhorn className="text-2xl" />
                                </div>
                                <FaArrowRight className="text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Announcements</h3>
                                <p className="text-gray-400 text-sm">Post news & updates.</p>
                            </div>
                        </motion.div>
                    </Link>
                </div>

            </div>

            {/* User Registry */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaChartLine className="text-cyan-400" /> User Registry
                    </h2>

                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium border-b border-white/10">User</th>
                                <th className="p-4 font-medium border-b border-white/10">Status</th>
                                <th className="p-4 font-medium border-b border-white/10">Role</th>
                                <th className="p-4 font-medium border-b border-white/10">Joined</th>
                                <th className="p-4 font-medium border-b border-white/10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.uid} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                                                    {user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium text-sm">{user.displayName}</div>
                                                    <div className="text-gray-500 text-xs">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${!user.disabled
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                {!user.disabled ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">
                                            {user.role}
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => toggleUserStatus(user.uid, user.disabled)}
                                                    className={`p-2 rounded-lg transition-colors ${!user.disabled
                                                        ? 'text-yellow-400 hover:bg-yellow-400/10'
                                                        : 'text-green-400 hover:bg-green-400/10'
                                                        }`}
                                                    title={!user.disabled ? "Disable Account" : "Enable Account"}
                                                >
                                                    {!user.disabled ? <FaUserTimes /> : <FaUserCheck />}
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.uid)}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete Account"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-white/10 text-xs text-center text-gray-600">
                    Showing {filteredUsers.length} of {users.length} registered users
                </div>
            </motion.div>
        </div>
    );
}
