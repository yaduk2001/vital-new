'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const industries = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Construction",
      description: "AI-powered project management and safety monitoring for construction sites. Optimize workflows and reduce risks with intelligent automation.",
      gradient: "from-orange-500 to-red-500",
      features: ["Safety Monitoring", "Project Management", "Resource Optimization"],
      color: "orange"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Logistics",
      description: "Smart route optimization and real-time tracking solutions. Streamline supply chains and improve delivery efficiency with predictive analytics.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Route Optimization", "Real-time Tracking", "Supply Chain Analytics"],
      color: "blue"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Education",
      description: "Personalized learning experiences and intelligent tutoring systems. Transform education with adaptive AI that enhances student engagement.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Personalized Learning", "Intelligent Tutoring", "Student Analytics"],
      color: "purple"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Retail",
      description: "Customer behavior analysis and inventory management automation. Boost sales and optimize operations with AI-driven retail insights.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Customer Analytics", "Inventory Management", "Sales Optimization"],
      color: "green"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Finance",
      description: "Fraud detection and automated financial analysis tools. Secure transactions and make data-driven decisions with intelligent financial AI.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Fraud Detection", "Financial Analytics", "Risk Assessment"],
      color: "yellow"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Healthcare",
      description: "Medical diagnosis assistance and patient care optimization. Improve healthcare outcomes with AI-powered diagnostic and treatment support.",
      gradient: "from-red-500 to-pink-500",
      features: ["Medical Diagnosis", "Patient Care", "Treatment Support"],
      color: "red"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Marketing",
      description: "Customer segmentation and campaign optimization automation. Drive better ROI with AI-powered marketing analytics and personalization.",
      gradient: "from-indigo-500 to-purple-500",
      features: ["Customer Segmentation", "Campaign Optimization", "Marketing Analytics"],
      color: "indigo"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Manufacturing",
      description: "Smart factory automation and predictive maintenance solutions. Enhance production efficiency and reduce downtime with AI-driven manufacturing insights.",
      gradient: "from-teal-500 to-emerald-500",
      features: ["Predictive Maintenance", "Quality Control", "Process Optimization"],
      color: "teal"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Real Estate",
      description: "Intelligent property valuation and market analysis tools. Make data-driven real estate decisions with AI-powered insights and automated property management.",
      gradient: "from-rose-500 to-pink-500",
      features: ["Property Valuation", "Market Analysis", "Smart Property Management"],
      color: "rose"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };



  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] relative overflow-hidden`}>

        {/* Enhanced Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-blue/30 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent-green/40 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-blueMedium/20 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-green/30 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent-blue/50 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-accent-green/25 rounded-full animate-float" style={{ animationDelay: '5s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/4 right-1/2 w-3 h-3 bg-accent-blueLight/30 rounded-full animate-float" style={{ animationDelay: '2.5s', animationDuration: '8.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-accent-green/35 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '7.5s' }}></div>
        </div>

        {/* Enhanced Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center bg-gradient-to-br from-[#0A0F1A]/50 via-[#1A2332]/30 via-[#0F2A1A]/40 to-[#0A0F1A]/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-2xl">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
              >
                Our <span className="text-gradient-primary">Services</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Comprehensive AI solutions designed to transform your business and drive innovation across all industries.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="btn-primary neon-border px-8 py-4 text-lg font-semibold">
                  Try Our API
                </button>
                <button className="btn-outline mirror-effect px-8 py-4 text-lg font-semibold">
                  Get Custom Quote
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#0A0F1A]/30 via-[#1A2332]/20 via-[#0F2A1A]/25 to-[#0A0F1A]/30 rounded-3xl p-8 border border-white/10">
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {industries.map((industry, index) => (
                  <motion.div
                    key={industry.title}
                    className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:border-white/20 transition-colors text-${industry.color}-400`}>
                        {industry.icon}
                      </div>
                      <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${industry.gradient} bg-clip-text text-transparent`}>
                        {industry.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                        {industry.description}
                      </p>
                      <ul className="space-y-2 mt-auto">
                        {industry.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                            <span className={`w-1.5 h-1.5 rounded-full bg-${industry.color}-500 mr-2`}></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Zones Section (Zig-Zag Layout) */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-600 drop-shadow-sm"
                initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
              >
                Why Choose Supe AI?
              </motion.h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Engineering Powerhouse. We integrate intelligence into every layer of your digital ecosystem.
              </p>
            </motion.div>

            <div className="relative mt-20">
              {/* Central Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-30 hidden md:block"></div>

              <div className="space-y-24">
                {/* Feature 1: Web Platforms */}
                {/* Feature 1: Web Platforms */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 bg-black/80 p-6 rounded-xl border border-blue-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      WEB PLATFORMS
                    </h3>
                    <h4 className="text-lg text-blue-200 mb-4 font-mono">Next-Gen Experience</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Building immersive, high-performance web applications using cutting-edge frameworks. We deliver speed, SEO-dominance, and responsive beauty.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/web development.webp"
                      alt="Web Platforms"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <div className="w-full md:w-5/12 order-3 hidden md:block"></div>
                </div>

                {/* Feature 2: Mobile Applications */}
                {/* Feature 2: Mobile Applications */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <div className="w-full md:w-5/12 order-3 md:order-1 hidden md:block"></div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/app dev.webp"
                      alt="Mobile Applications"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-left order-2 md:order-3 bg-black/80 p-6 rounded-xl border border-green-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                      MOBILE APPLICATIONS
                    </h3>
                    <h4 className="text-lg text-green-200 mb-4 font-mono">iOS & Android</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Native and cross-platform mobile solutions that feel fluid and intuitive. From consumer apps to enterprise mobility instruments.
                    </p>
                  </motion.div>
                </div>

                {/* Feature 3: AI */}
                {/* Feature 3: AI */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 bg-black/80 p-6 rounded-xl border border-purple-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
                      ARTIFICIAL INTELLIGENCE
                    </h3>
                    <h4 className="text-lg text-purple-200 mb-4 font-mono">The Core Brain</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Deploying LLMs, computer vision, and predictive analytics. We integrate intelligence into every layer of your digital ecosystem.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/AI.webp"
                      alt="Artificial Intelligence"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <div className="w-full md:w-5/12 order-3 hidden md:block"></div>
                </div>

                {/* Feature 4: Ecosystems */}
                {/* Feature 4: Ecosystems */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <div className="w-full md:w-5/12 order-3 md:order-1 hidden md:block"></div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/digital ecosystem.webp"
                      alt="Digital Ecosystems"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-left order-2 md:order-3 bg-black/80 p-6 rounded-xl border border-orange-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                      DIGITAL ECOSYSTEMS
                    </h3>
                    <h4 className="text-lg text-orange-200 mb-4 font-mono">Complete Integration</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Connecting IoT, Cloud, and Blockchain into a unified powerhouse. We architect scalable systems for the future of enterprise.
                    </p>
                  </motion.div>
                </div>

                {/* Feature 5: Blockchain Solutions */}
                {/* Feature 5: Blockchain Solutions */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 bg-black/80 p-6 rounded-xl border border-cyan-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                      BLOCKCHAIN SOLUTIONS
                    </h3>
                    <h4 className="text-lg text-cyan-200 mb-4 font-mono">Decentralized Trust</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Secure, transparent, and immutable ledger technologies. We build smart contracts, DeFi platforms, and enterprise blockchain solutions that redefine trust.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/blockchain.webp"
                      alt="Blockchain Solutions"
                      className="w-full h-full object-cover transform scale-150 translate-x-5 hover:scale-175 transition-transform duration-500"
                    />
                  </motion.div>

                  <div className="w-full md:w-5/12 order-3 hidden md:block"></div>
                </div>

                {/* Feature 6: Game Development */}
                {/* Feature 6: Game Development */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible"
                >
                  <div className="w-full md:w-5/12 order-3 md:order-1 hidden md:block"></div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="order-1 md:order-2 z-10 w-24 h-24 rounded-full border-2 border-red-500/30 shadow-[0_0_30px_rgba(248,113,113,0.4)] overflow-hidden relative bg-[#0A0F1A]"
                  >
                    <img
                      src="/images/game development.webp"
                      alt="Game Development"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="w-full md:w-5/12 text-center md:text-left order-2 md:order-3 bg-black/80 p-6 rounded-xl border border-red-500/20"
                  >
                    <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">
                      GAME DEVELOPMENT
                    </h3>
                    <h4 className="text-lg text-red-200 mb-4 font-mono">Immersive Worlds</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Creating captivating gaming experiences with Unreal Engine and Unity. From high-fidelity 3D environments to addictive mobile games, we bring imagination to life.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto bg-[#050505] rounded-3xl p-12 border border-white/20 shadow-2xl relative overflow-hidden"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Industry?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let&#39;s discuss how our AI solutions can drive innovation and growth for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline"
                >
                  Schedule Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Supe AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
} 