'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const socialLinks = [
    { icon: "📧", label: "Email", href: "mailto:thesupeai@gmail.com" },
    { icon: "📱", label: "Phone", href: "tel:+1234567890" },
    { icon: "💼", label: "LinkedIn", href: "#" },
    { icon: "🐦", label: "Twitter", href: "#" },
    { icon: "📘", label: "Facebook", href: "#" },
    { icon: "📷", label: "Instagram", href: "#" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Use environment variable or fallback to localhost for development
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ||
      (typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : '');

    console.log('Submitting to:', `${BACKEND_URL}/api/contact`);
    console.log('Form data:', formData);

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Add timeout
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setShowSuccessModal(true);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      let errorMsg = 'An error occurred. Please try again later.';

      if (error.name === 'AbortError') {
        errorMsg = 'Request timed out. Please check your connection and try again.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMsg = 'Cannot connect to server. Please make sure the backend is running.';
      } else {
        errorMsg = error.message || errorMsg;
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] to-[#0A0F1A] transition-all duration-300 relative overflow-hidden`}>

        {/* Enhanced Animated Background Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            animate={{ y: [-12, 12, -12], x: [-6, 6, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent-blue rounded-full opacity-60 glow-effect"
          />
          <motion.div
            animate={{ y: [12, -12, 12], x: [6, -6, 6] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-blueMedium rounded-full opacity-40 glow-effect"
          />
          <motion.div
            animate={{ y: [-8, 18, -8], x: [-12, 12, -12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-accent-blueLight rounded-full opacity-50 glow-effect"
          />
        </div>

        {/* Enhanced Hero Section */}
        <section className="py-16 lg:py-24 relative z-10 bg-gradient-to-br from-[#0A0F1A]/50 via-[#1A2332]/30 to-[#0A0F1A]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}

              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Get in{' '}
                <span className="text-gradient-primary">
                  Touch
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Ready to transform your business with AI? Let&#39;s start a conversation
                about how we can help you achieve your goals.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0A0F1A]/30 via-[#1A2332]/20 to-[#0A0F1A]/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-accent-blue to-accent-blueMedium hover:from-accent-blueMedium hover:to-accent-blue disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300 gap-3">
                      <Image src="/images/gmail.svg" alt="Gmail" width={24} height={24} className="flex-shrink-0" />
                      <a href="mailto:contact@supeai.com" className="hover:text-accent-cyan transition">hello@thesupeai.com</a>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <span className="fi fi-in flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                      <a href="tel:+918075851517" className="hover:text-accent-cyan transition">+91 8075851517</a>
                      <span className="ml-auto text-xs text-gray-400">India</span>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <span className="fi fi-gb flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                      <a href="tel:+61478321679" className="hover:text-accent-cyan transition">+61 478 321 679</a>
                      <span className="ml-auto text-xs text-gray-400">UK/London</span>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <span className="fi fi-au flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                      <a href="tel:+61468371679" className="hover:text-accent-cyan transition">+61 468 371 679</a>
                      <span className="ml-auto text-xs text-gray-400">Australia</span>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <span className="fi fi-ae flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                      <a href="tel:+971569779819" className="hover:text-accent-cyan transition">+971 56 977 9819</a>
                      <span className="ml-auto text-xs text-gray-400">Dubai, UAE</span>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <span className="fi fi-de flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                      <a href="tel:+4917632420097" className="hover:text-accent-cyan transition">+49 176 32420097</a>
                      <span className="ml-auto text-xs text-gray-400">Germany</span>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <svg className="w-6 h-6 flex-shrink-0" fill="#0077b5" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <a href="https://www.linkedin.com/company/supe-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition">LinkedIn</a>
                    </div>
                    <div className="flex items-center text-gray-300 gap-3">
                      <svg className="w-6 h-6 flex-shrink-0" fill="#0088cc" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.264-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      <a href="https://t.me/+UD-_HA-hjqYyYTc9" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition">Telegram</a>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 text-center hover:border-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Scan Location QR</h3>
                  <div className="bg-gradient-to-br from-accent-blue to-accent-blueMedium rounded-lg p-6 mb-4 flex flex-col items-center">
                    <QRCodeSVG
                      value="https://maps.google.com/?q=Edappally+Kochi+Kerala+India"
                      size={160}
                      bgColor="#0A0F1A"
                      fgColor="#146EE9"
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    Scan to get location
                  </p>
                </div>

                {/* Social Links */}
                {/* Remove or update the socialLinks array and its rendering if needed, since main contacts are now above. */}
              </motion.div>
            </div>

            {/* Office Locations - Horizontal Layout */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto"
            >
              {/* Sydney Location Section */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 mx-auto bg-blue-900/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-900/20 transition-colors">
                    <span className="text-2xl">🇦🇺</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Sydney</h3>
                  <div className="mb-3 text-gray-300 text-sm">1/8 Arthur St, Ryde NSW 2112</div>
                </div>
                <a href="https://maps.google.com/?q=1/8+Arthur+St,Ryde+NSW+2112" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline text-xs mt-auto inline-block py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">View Map</a>
              </div>

              {/* London Location Section */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 mx-auto bg-red-900/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-900/20 transition-colors">
                    <span className="text-2xl">🇬🇧</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">London</h3>
                  <div className="mb-3 text-gray-300 text-sm">E16 3RU, London, UK</div>
                </div>
                <a href="https://maps.google.com/?q=E16+3RU+London+UK" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline text-xs mt-auto inline-block py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">View Map</a>
              </div>

              {/* Dubai Location Section */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 mx-auto bg-green-900/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-900/20 transition-colors">
                    <span className="text-2xl">🇦🇪</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Dubai</h3>
                  <div className="mb-3 text-gray-300 text-sm">Silicon Oasis Pineapple Tower</div>
                </div>
                <a href="https://maps.google.com/?q=Silicon+Oasis+Pineapple+Tower+Dubai" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline text-xs mt-auto inline-block py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">View Map</a>
              </div>

              {/* Germany Location Section */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 mx-auto bg-yellow-900/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-900/20 transition-colors">
                    <span className="text-2xl">🇩🇪</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Germany</h3>
                  <div className="mb-3 text-gray-300 text-sm">Hegaustraße 54, 78239</div>
                </div>
                <a href="https://maps.google.com/?q=Hegaustraße+54+78239+Rielasingen-Worblingen+Germany" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline text-xs mt-auto inline-block py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">View Map</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Us
              </h2>
              <p className="text-lg text-gray-300">
                Visit our headquarters or get in touch online
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="aspect-video rounded-lg overflow-hidden min-w-[250px]">
                <iframe
                  src="https://www.google.com/maps?q=Edappally+Kochi+Kerala+India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supe AI Location - Edappally, Kochi"
                ></iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden min-w-[250px]">
                <iframe
                  src="https://www.google.com/maps?q=1/8+Arthur+St,Ryde+NSW+2112&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supe AI Location - Sydney, Ryde"
                ></iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden min-w-[250px]">
                <iframe
                  src="https://www.google.com/maps?q=E16+3RU+London+UK&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supe AI Location - London"
                ></iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden min-w-[250px]">
                <iframe
                  src="https://www.google.com/maps?q=Silicon+Oasis+Pineapple+Tower+Dubai&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supe AI Location - Dubai"
                ></iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden min-w-[250px]">
                <iframe
                  src="https://www.google.com/maps?q=Hegaustraße+54+78239+Rielasingen-Worblingen+Germany&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supe AI Location - Germany"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Business Hours</h2>
              <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">Weekdays</h3>
                    <p className="text-gray-300">Monday - Friday</p>
                    <p className="text-accent-blue font-semibold">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">Weekends</h3>
                    <p className="text-gray-300">Saturday - Sunday</p>
                    <p className="text-accent-blue font-semibold">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Supe AI. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

              {/* Modal */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-gradient-to-br from-[#0A0F1A] to-[#1A2332] rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Checkmark Animation */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2
                    }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
                  >
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4
                      }}
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Success Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for your message! We have received it and will contact you soon.
                  </p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-gradient-to-r from-accent-blue to-accent-blueMedium hover:from-accent-blueMedium hover:to-accent-blue text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    OK
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 z-50 bg-red-500/20 border border-red-500/30 rounded-lg p-4 max-w-md backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-red-400 font-medium mb-1">Error</p>
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
                <button
                  onClick={() => setErrorMessage('')}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 