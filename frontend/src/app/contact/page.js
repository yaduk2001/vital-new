'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import LiveBackground from '../../components/LiveBackground';
import TiltCard from '../../components/TiltCard';
import MagneticButton from '../../components/MagneticButton';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ||
      (typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : '');

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setFormData({ name: '', email: '', message: '' });
        setShowSuccessModal(true);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
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

  const offices = [
    { city: "Sydney", flag: "🇦🇺", address: "1/8 Arthur St, Ryde NSW 2112", color: "blue" },
    { city: "London", flag: "🇬🇧", address: "E16 3RU, London, UK", color: "red" },
    { city: "Dubai", flag: "🇦🇪", address: "Silicon Oasis Pineapple Tower", color: "green" },
    { city: "Germany", flag: "🇩🇪", address: "Hegaustraße 54, 78239", color: "yellow" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] relative overflow-hidden">

        {/* Hero Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 mt-20 overflow-hidden">
          <LiveBackground src="/images/hero-bg-1.webp" opacity={0.4} blur="blur-lg" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md"
              >
                <span className="text-sm font-medium text-cyan-300 uppercase tracking-wider">Let&apos;s Connect</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
                Get in Touch
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Ready to transform your business with AI? Let&apos;s start a conversation about how we can help you achieve your goals
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <LiveBackground src="/images/tech-bg-2.webp" opacity={0.2} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all">
                    <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>

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
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="Tell us about your project or how we can help..."
                        />
                      </div>

                      <MagneticButton className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-cyan-50 disabled:bg-gray-600 disabled:text-gray-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:shadow-none"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </MagneticButton>
                    </form>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Contact Info */}
                <TiltCard spotlight={true} spotlightColor="rgba(34, 197, 94, 0.2)">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                    <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                      <FaEnvelope /> Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-300 gap-3">
                        <Image src="/images/gmail.svg" alt="Gmail" width={24} height={24} className="flex-shrink-0" />
                        <a href="mailto:hello@thesupeai.com" className="hover:text-cyan-400 transition">hello@thesupeai.com</a>
                      </div>
                      <div className="flex items-center text-gray-300 gap-3">
                        <span className="fi fi-in flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                        <a href="tel:+918075851517" className="hover:text-cyan-400 transition">+91 8075851517</a>
                      </div>
                      <div className="flex items-center text-gray-300 gap-3">
                        <span className="fi fi-gb flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                        <a href="tel:+61478321679" className="hover:text-cyan-400 transition">+61 478 321 679</a>
                      </div>
                      <div className="flex items-center text-gray-300 gap-3">
                        <span className="fi fi-au flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                        <a href="tel:+61468371679" className="hover:text-cyan-400 transition">+61 468 371 679</a>
                      </div>
                      <div className="flex items-center text-gray-300 gap-3">
                        <span className="fi fi-ae flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                        <a href="tel:+971569779819" className="hover:text-cyan-400 transition">+971 56 977 9819</a>
                      </div>
                      <div className="flex items-center text-gray-300 gap-3">
                        <span className="fi fi-de flex-shrink-0" style={{ width: '24px', height: '18px' }}></span>
                        <a href="tel:+4917632420097" className="hover:text-cyan-400 transition">+49 176 32420097</a>
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* QR Code */}
                <TiltCard spotlight={true} spotlightColor="rgba(168, 85, 247, 0.2)">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all text-center">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Scan Location QR</h3>
                    <div className="bg-white rounded-lg p-4 inline-block">
                      <QRCodeSVG
                        value="https://maps.google.com/?q=Edappally+Kochi+Kerala+India"
                        size={140}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                      Scan to get location
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Unified Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Global Presence
              </h2>
              <p className="text-gray-400 text-lg">
                We&apos;re here to serve you across the globe
              </p>
            </motion.div>

            {/* Contact Channels Grid (Email & Phones) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-16"
            >
              {/* Email */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="/images/gmail.svg" alt="Gmail" className="h-8 w-auto object-contain" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-blue-400">Email</span>
                    </h3>
                    <a href="mailto:contact@supeai.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                      contact@supeai.in
                    </a>
                  </div>
                </TiltCard>
              </motion.div>

              {/* India Flag & Phone */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(249, 115, 22, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="https://flagcdn.com/in.svg" alt="India Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-orange-400">India</span> <span className="text-green-400">Office</span>
                    </h3>
                    <a href="tel:+918075851517" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +91 8075851517
                    </a>
                  </div>
                </TiltCard>
              </motion.div>

              {/* UK Flag & Phone */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(239, 68, 68, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-red-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-red-400">UK</span> <span className="text-blue-400">Office</span>
                    </h3>
                    <a href="tel:+447404465149" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +44 7404 465149
                    </a>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Australia Flag & Phone */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="https://flagcdn.com/au.svg" alt="Australia Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-blue-400">Australia</span> <span className="text-red-400">Office</span>
                    </h3>
                    <a href="tel:+61468371679" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +61 468 371679
                    </a>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Dubai Flag & Phone */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(34, 197, 94, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="https://flagcdn.com/ae.svg" alt="UAE Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-red-400">Dubai</span> <span className="text-green-400">Office</span>
                    </h3>
                    <a href="tel:+971569779819" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +971 56 977 9819
                    </a>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Germany Flag & Phone */}
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                initial="hidden"
                whileInView="visible"
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(234, 179, 8, 0.2)">
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-yellow-500/30 transition-all text-center group">
                    <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src="https://flagcdn.com/de.svg" alt="Germany Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <span className="text-yellow-400">Germany</span> <span className="text-red-400">Office</span>
                    </h3>
                    <a href="tel:+4917632420097" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +49 176 32420097
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>

            {/* Map Container - Dark Box */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 max-w-6xl mx-auto shadow-2xl relative overflow-hidden"
            >
              {/* Subtle background glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                {/* Kochi Map */}
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-64 rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://maps.google.com/maps?q=Edappally,%20Kochi,%20Kerala,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    title="Kochi Office Map"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl font-bold mb-1">
                      <span className="text-orange-400">Kochi</span> <span className="text-green-400">Office</span>
                    </h3>
                    <p className="text-gray-300 text-xs truncate">Edappally, Kochi, Kerala, India</p>
                  </div>
                </div>

                {/* London Map */}
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-64 rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://maps.google.com/maps?q=E16%203RU,%20London,%20UK&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    title="London Office Map"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl font-bold mb-1">
                      <span className="text-red-400">London</span> <span className="text-blue-400">Office</span>
                    </h3>
                    <p className="text-gray-300 text-xs truncate">E16 3RU, London, UK</p>
                  </div>
                </div>

                {/* Sydney Map */}
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-64 rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://maps.google.com/maps?q=1/8%20Arthur%20St,%20Ryde%20NSW%202112&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    title="Sydney Office Map"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl font-bold mb-1">
                      <span className="text-blue-400">Sydney</span> <span className="text-red-400">Office</span>
                    </h3>
                    <p className="text-gray-300 text-xs truncate">1/8 Arthur St, Ryde NSW 2112</p>
                  </div>
                </div>

                {/* Dubai Map */}
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-64 rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://maps.google.com/maps?q=Silicon%20Oasis%20Pineapple%20Tower,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    title="Dubai Office Map"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl font-bold mb-1">
                      <span className="text-red-400">Dubai</span> <span className="text-green-400">Office</span>
                    </h3>
                    <p className="text-gray-300 text-xs truncate">Silicon Oasis Pineapple Tower, Dubai</p>
                  </div>
                </div>

                {/* Germany Map  */}
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-64 rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://maps.google.com/maps?q=Hegaustraße%2054,%2078239%20Rielasingen-Worblingen&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    title="Germany Office Map"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl font-bold mb-1">
                      <span className="text-yellow-400">Germany</span> <span className="text-red-400">Office</span>
                    </h3>
                    <p className="text-gray-300 text-xs truncate">Hegaustraße 54, 78239 Rielasingen-Worblingen</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TiltCard spotlight={true} spotlightColor="rgba(250, 204, 21, 0.2)">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-yellow-500/30 transition-all">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Business Hours</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Weekdays</h3>
                      <p className="text-gray-300 mb-2">Monday - Friday</p>
                      <p className="text-cyan-400 font-bold text-lg">9:00 AM - 6:00 PM</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Weekends</h3>
                      <p className="text-gray-300 mb-2">Saturday - Sunday</p>
                      <p className="text-cyan-400 font-bold text-lg">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 bg-black text-center">
          <div className="container mx-auto px-4">
            <p className="text-gray-500 text-sm">
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
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
                  >
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
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
                    Thank you for your message! We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-cyan-50 transition-all shadow-lg"
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