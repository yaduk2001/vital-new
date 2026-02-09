'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import StaticLogo from '../../../components/StaticLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { login, signInWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await login(email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/chat');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/chat');
      }, 1500);
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.message || 'Failed to login with Google');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] to-[#0A0F1A] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
                             <motion.div 
                 className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-accent-cyan shadow-lg"
                 whileHover={{ scale: 1.05 }}
               >
                 <StaticLogo
                   className="w-full h-full"
                   width={40}
                   height={40}
                   withZoom={true}
                 />
               </motion.div>
              <span className="text-white font-bold text-2xl group-hover:text-accent-blue transition-colors">
                Supe AI
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your Supe AI account</p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                />
                {/* AI-inspired Eye Icon */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-blue hover:text-accent-blueMedium focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {/* AI-inspired eye icon (eye with circuit lines) */}
                  {showPassword ? (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <ellipse cx="12" cy="12" rx="7" ry="5" strokeDasharray="2 2" />
                      <circle cx="12" cy="12" r="2.5" fill="#00FFC2" stroke="#00FFC2" />
                      <path d="M12 7V5M12 19v-2M7 12H5M19 12h-2M8.5 8.5l-1.5-1.5M15.5 15.5l1.5 1.5M8.5 15.5l-1.5 1.5M15.5 8.5l1.5-1.5" stroke="#00FFC2" strokeWidth="1.2" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <ellipse cx="12" cy="12" rx="7" ry="5" />
                      <circle cx="12" cy="12" r="2.5" fill="#00FFC2" stroke="#00FFC2" />
                      <path d="M12 7V5M12 19v-2M7 12H5M19 12h-2M8.5 8.5l-1.5-1.5M15.5 15.5l1.5 1.5M8.5 15.5l-1.5 1.5M15.5 8.5l1.5-1.5" stroke="#00FFC2" strokeWidth="1.2" />
                      <line x1="4" y1="20" x2="20" y2="4" stroke="#00FFC2" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-blue to-accent-blueMedium text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-blueMedium hover:to-accent-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/30 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don&#39;t have an account?{' '}
                <Link href="/auth/signup" className="text-accent-blue hover:text-accent-blueMedium transition-colors font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 