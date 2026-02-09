'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import StaticLogo from './StaticLogo';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 group z-50 relative">
            <motion.div
              className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-accent-blue shadow-lg glow-effect"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <StaticLogo
                className="w-full h-full"
                width={40}
                height={40}
                withZoom={true}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl group-hover:text-[#146EE9] transition-colors">
                Supe AI
              </span>
              <span className="text-xs text-accent-blue mt-1 font-medium tracking-wide animate-pulse-slow">
                Empowering Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Services', 'Contact', 'Chat'].map((item, index) => (
              <NavItem key={item} item={item} index={index} />
            ))}
          </nav>

          {/* Mobile Actions (UserMenu + Toggle) */}
          <div className="flex items-center gap-4 md:hidden z-50 relative">
            <UserMenu />
            <button
              className="flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block origin-center transition-all"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-white block transition-all"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block origin-center transition-all"
                />
              </div>
            </button>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 top-0 left-0 bg-black/95 backdrop-blur-3xl z-40 flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {['About', 'Services', 'Contact', 'Chat'].map((item, index) => (
                <MobileNavItem
                  key={item}
                  item={item}
                  index={index}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>

            {/* Mobile Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-12 border-t border-white/10 pt-8"
            >
              <div className="text-gray-400 text-sm text-center">
                <p className="mb-2">© 2024 Supe AI</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavItem({ item, index }) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Palette: Blue/Cyan -> Light Red -> Green -> Orange -> Purple -> Pink
  const colors = [
    { text: 'text-cyan-400', gradient: 'from-cyan-400 to-blue-500' },
    { text: 'text-red-400', gradient: 'from-red-400 to-rose-500' },
    { text: 'text-green-400', gradient: 'from-green-400 to-emerald-500' },
    { text: 'text-orange-400', gradient: 'from-orange-400 to-amber-500' },
    { text: 'text-purple-400', gradient: 'from-purple-400 to-violet-500' },
    { text: 'text-pink-400', gradient: 'from-pink-400 to-fuchsia-500' },
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverIndex((prev) => (prev + 1) % colors.length);
  };

  const currentColor = colors[hoverIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + (0.1 * index), duration: 0.5, type: "spring", stiffness: 100 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${item.toLowerCase()}`} className="relative px-1 py-1 block group">
        <span
          className={`relative z-10 font-medium transition-colors duration-300 ${isHovered ? currentColor.text : 'text-white'}`}
        >
          {item}
        </span>
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ease-out ${currentColor.gradient} ${isHovered ? 'w-full' : 'w-0'}`}
        />
        {/* Glow effect */}
        <span className={`absolute -inset-2 bg-gradient-to-r ${currentColor.gradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 rounded-lg -z-10`} />
      </Link>
    </motion.div>
  );
}

function MobileNavItem({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Link
        href={`/${item.toLowerCase()}`}
        onClick={onClick}
        className="block group"
      >
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98] transition-all duration-200">
          <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {item}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}