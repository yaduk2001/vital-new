'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import StaticLogo from '../../../components/StaticLogo';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountType: 'personal', // default to personal
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [shouldShowRequirements, setShouldShowRequirements] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  // Check if all password requirements are met
  const allRequirementsMet = Object.values(passwordValidation).every(Boolean);

  // Effect to handle auto-hiding of requirements
  useEffect(() => {
    if (allRequirementsMet) {
      // Add a small delay before hiding to show the green checkmarks
      const timer = setTimeout(() => {
        setShouldShowRequirements(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [allRequirementsMet]);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setShouldShowRequirements(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
    if (!allRequirementsMet) {
      setShouldShowRequirements(true);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Check all password requirements
    if (!Object.values(passwordValidation).every(Boolean)) {
      setError('Please meet all password requirements');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account');
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join Supe AI today</p>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8"
          >
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Account Type Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'accountType', value: 'personal' } })}
                    className={`px-4 py-3 rounded-lg text-center transition-all duration-300 ${
                      formData.accountType === 'personal'
                        ? 'bg-accent-blue text-white font-semibold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'accountType', value: 'business' } })}
                    className={`px-4 py-3 rounded-lg text-center transition-all duration-300 ${
                      formData.accountType === 'business'
                        ? 'bg-accent-blue text-white font-semibold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Business
                  </button>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300 pr-12"
                  placeholder="Create a password"
                />
                {/* Eye Icon */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-blue hover:text-accent-blueMedium focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
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
                {/* Password Requirements */}
                <div className={`mt-2 space-y-2 transition-all duration-300 ${shouldShowRequirements ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <div className="text-sm text-gray-400 mb-1">Password must contain:</div>
                  <div className={`text-sm flex items-center space-x-2 ${passwordValidation.minLength ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{passwordValidation.minLength ? '✓' : '×'}</span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`text-sm flex items-center space-x-2 ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{passwordValidation.hasUpperCase ? '✓' : '×'}</span>
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`text-sm flex items-center space-x-2 ${passwordValidation.hasNumber ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{passwordValidation.hasNumber ? '✓' : '×'}</span>
                    <span>One number</span>
                  </div>
                  <div className={`text-sm flex items-center space-x-2 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{passwordValidation.hasSpecialChar ? '✓' : '×'}</span>
                    <span>One special character</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300 pr-12"
                  placeholder="Confirm your password"
                />
                {/* Eye Icon */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-blue hover:text-accent-blueMedium focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
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

              {/* Signup Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-blue to-accent-blueMedium text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-blueMedium hover:to-accent-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-accent-blue hover:text-accent-blueMedium transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 