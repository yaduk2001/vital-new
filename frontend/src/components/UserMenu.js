'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function UserMenu() {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return null; // Or a spinner if you want
  }
  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/auth/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-blueMedium text-white font-semibold rounded-full hover:from-accent-blueMedium hover:to-accent-blue transition-all duration-300 shadow-lg"
          >
            Sign In
          </motion.button>
        </Link>
      </div>
    );
  }
  // Authenticated: show Logout button only
  return (
    <div className="flex items-center space-x-4">
      <motion.button
        onClick={logout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-full hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg"
      >
        Logout
      </motion.button>
    </div>
  );
} 