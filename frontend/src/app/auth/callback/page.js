'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext'

// Get backend URL from environment variable
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState('Processing authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setError(`Authentication failed: ${error}`);
          return;
        }

        if (!code) {
          setError('No authorization code received');
          return;
        }

        setStatus('Completing authentication...');

        // Exchange the code for a session
        const response = await fetch(`${BACKEND_URL}/api/auth/callback?code=${code}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setStatus('Authentication successful! Redirecting...');
          
          // Refresh user state
          await refreshUser();
          
          // Redirect to home page after successful authentication
          setTimeout(() => {
            router.push('/');
          }, 1500);
        } else {
          const data = await response.json();
          setError(data.error || 'Authentication failed');
        }
      } catch (error) {
        console.error('Callback error:', error);
        setError('An unexpected error occurred during authentication');
      }
    };

    handleCallback();
  }, [searchParams, router, refreshUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051A05] via-[#0A2A0A] to-[#051A05] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/80 rounded-2xl flex items-center justify-center mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Authentication</h1>
          <p className="text-gray-400">Please wait while we complete your sign-in</p>
        </div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8"
        >
          {error ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Authentication Failed</h2>
              <p className="text-red-400 mb-6">{error}</p>
              <motion.button
                onClick={() => router.push('/auth/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-[#00FFC2] to-[#00FFC2]/90 text-black font-semibold rounded-lg hover:from-[#00FFC2]/90 hover:to-[#00FFC2] transition-all duration-300 shadow-lg"
              >
                Try Again
              </motion.button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00FFC2]/20 border border-[#00FFC2]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.svg 
                  className="w-6 h-6 text-[#00FFC2]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Processing</h2>
              <p className="text-gray-300 mb-6">{status}</p>
              <div className="flex justify-center">
                <motion.div
                  className="w-2 h-2 bg-[#00FFC2] rounded-full mx-1"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#00FFC2] rounded-full mx-1"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#00FFC2] rounded-full mx-1"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
} 