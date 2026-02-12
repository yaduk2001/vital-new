'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import TiltCard from '../../components/TiltCard';
import MagneticButton from '../../components/MagneticButton';
import LiveBackground from '../../components/LiveBackground';
import { FaRocket, FaMobileAlt, FaBrain, FaNetworkWired, FaLink, FaGamepad, FaHeartbeat, FaIndustry, FaBolt } from 'react-icons/fa';

export default function ServicesPage() {
  const industries = [
    {
      icon: <FaLink className="w-12 h-12" />,
      title: "Blockchain",
      description: "Secure, transparent decentralized ledgers for supply chain, finance, and identity management.",
      gradient: "from-cyan-400 to-blue-600",
      features: ["Smart Contracts", "Immutable Records", "DeFi Integration"],
      color: "cyan",
      spotlight: "rgba(34, 211, 238, 0.2)",
      videoSrc: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4",
      videoFilter: "hue-rotate(0deg)"
    },
    {
      icon: <FaRocket className="w-12 h-12" />,
      title: "Construction",
      description: "AI-powered project management and safety monitoring for construction sites. Optimize workflows and reduce risks with intelligent automation.",
      gradient: "from-orange-500 to-red-500",
      features: ["Safety Monitoring", "Project Management", "Resource Optimization"],
      color: "orange",
      spotlight: "rgba(251, 146, 60, 0.2)",
      videoSrc: "https://media.giphy.com/media/l46Cy1rDwQyMsyht6/giphy.mp4",
      videoFilter: "hue-rotate(180deg) brightness(1.2)"
    },
    {
      icon: <FaNetworkWired className="w-12 h-12" />,
      title: "Logistics",
      description: "Smart route optimization and real-time tracking solutions. Streamline supply chains and improve delivery efficiency with predictive analytics.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Route Optimization", "Real-time Tracking", "Supply Chain Analytics"],
      color: "blue",
      spotlight: "rgba(59, 130, 246, 0.2)",
      videoSrc: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4",
      videoFilter: "hue-rotate(20deg)"
    },
    {
      icon: <FaBrain className="w-12 h-12" />,
      title: "Education",
      description: "Personalized learning experiences and intelligent tutoring systems. Transform education with adaptive AI that enhances student engagement.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Personalized Learning", "Intelligent Tutoring", "Student Analytics"],
      color: "purple",
      spotlight: "rgba(168, 85, 247, 0.2)",
      videoSrc: "https://media.giphy.com/media/l46Cy1rDwQyMsyht6/giphy.mp4",
      videoFilter: "hue-rotate(260deg)"
    },
    {
      icon: <FaMobileAlt className="w-12 h-12" />,
      title: "Retail",
      description: "Customer behavior analysis and inventory management automation. Boost sales and optimize operations with AI-driven retail insights.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Customer Analytics", "Inventory Management", "Sales Optimization"],
      color: "green",
      spotlight: "rgba(74, 222, 128, 0.2)",
      videoSrc: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4",
      videoFilter: "hue-rotate(120deg)"
    },
    {
      icon: <FaGamepad className="w-12 h-12" />,
      title: "Finance",
      description: "Fraud detection and automated financial analysis tools. Secure transactions and make data-driven decisions with intelligent financial AI.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Fraud Detection", "Financial Analytics", "Risk Assessment"],
      color: "yellow",
      spotlight: "rgba(250, 204, 21, 0.2)",
      videoSrc: "https://media.giphy.com/media/l46Cy1rDwQyMsyht6/giphy.mp4",
      videoFilter: "hue-rotate(60deg) brightness(1.1)"
    },
    {
      icon: <FaHeartbeat className="w-12 h-12" />,
      title: "Healthcare",
      description: "AI-driven diagnostics and patient data management systems. Enhance care delivery standards with predictive health analytics.",
      gradient: "from-rose-500 to-red-600",
      features: ["Predictive Diagnostics", "Patient Monitoring", "Medical Imaging"],
      color: "rose",
      spotlight: "rgba(244, 63, 94, 0.2)",
      videoSrc: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4",
      videoFilter: "hue-rotate(320deg)"
    },
    {
      icon: <FaIndustry className="w-12 h-12" />,
      title: "Manufacturing",
      description: "Smart factory automation and predictive maintenance. Optimize production lines and quality control with IoT and machine learning.",
      gradient: "from-slate-400 to-gray-500",
      features: ["Predictive Maintenance", "Smart Automation", "Quality Control"],
      color: "gray",
      spotlight: "rgba(148, 163, 184, 0.2)",
      videoSrc: "https://media.giphy.com/media/l46Cy1rDwQyMsyht6/giphy.mp4",
      videoFilter: "grayscale(100%) brightness(0.8)"
    },
    {
      icon: <FaBolt className="w-12 h-12" />,
      title: "Energy",
      description: "Grid optimization and renewable energy management. Drive sustainability and efficiency with smart grid AI solutions.",
      gradient: "from-amber-400 to-yellow-500",
      features: ["Grid Optimization", "Renewable Manage", "Consumption Analytics"],
      color: "amber",
      spotlight: "rgba(251, 191, 36, 0.2)",
      videoSrc: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4",
      videoFilter: "hue-rotate(40deg)"
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] overflow-hidden relative">
        <LiveBackground src="/images/hero-bg-1.webp" opacity={0.3} blur="blur-lg" />

        {/* Hero Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 mt-20 overflow-hidden">
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
                <span className="text-sm font-medium text-cyan-300 uppercase tracking-wider">Enterprise Solutions</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
                Our Services
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Comprehensive AI & Blockchain solutions engineered to transform industries and redefine what&apos;s possible
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <MagneticButton>
                    <div className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                      Get Started
                    </div>
                  </MagneticButton>
                </Link>
                <Link href="/contact">
                  <MagneticButton>
                    <div className="px-8 py-4 bg-black border border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                      Custom Quote
                    </div>
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Industries We Transform
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Delivering cutting-edge solutions across diverse sectors
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TiltCard spotlight={true} spotlightColor={industry.spotlight} className="h-full">
                    <div className="h-full flex flex-col p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
                      {/* Video Background */}
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500" style={{ filter: industry.videoFilter }}>
                        <LiveBackground videoSrc={industry.videoSrc} opacity={1} blur="blur-0" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`mb-6 p-4 rounded-xl bg-white/10 w-fit border border-white/20 text-${industry.color}-400 group-hover:scale-110 transition-transform backdrop-blur-md shadow-lg`}>
                          {industry.icon}
                        </div>

                        <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${industry.gradient}`}>
                          {industry.title}
                        </h3>

                        <p className="text-gray-300 leading-relaxed mb-6 flex-grow text-sm font-medium drop-shadow-md">
                          {industry.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {industry.features.map((feature, idx) => (
                            <span key={idx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-black/50 text-white/90 border border-white/10 backdrop-blur-sm shadow-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
          <LiveBackground src="/images/tech-bg-2.webp" opacity={0.2} />

          {/* Floating Background Shapes */}
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"
          />
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                Core Capabilities
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Engineering excellence across the full technology stack
              </p>
            </motion.div>

            <div className="space-y-32">
              {/* Web Platforms */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="flex-1">
                  <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)">
                    <div className="bg-black/80 p-10 rounded-2xl border border-blue-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-blue-900/20 text-blue-400">
                          <FaRocket className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Web Platforms
                          </h3>
                          <p className="text-blue-200 font-mono text-sm">Next-Gen Experience</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Building immersive, high-performance web applications using cutting-edge frameworks. We deliver speed, SEO-dominance, and responsive beauty that converts.
                      </p>
                    </div>
                  </TiltCard>
                </div>
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/web development.webp"
                    alt="Web Development"
                    fill
                    className="object-cover rounded-full border-4 border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                  />
                </div>
              </motion.div>

              {/* Mobile Apps */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row-reverse items-center gap-12"
              >
                <div className="flex-1">
                  <TiltCard spotlight={true} spotlightColor="rgba(34, 197, 94, 0.2)">
                    <div className="bg-black/80 p-10 rounded-2xl border border-green-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-green-900/20 text-green-400">
                          <FaMobileAlt className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                            Mobile Applications
                          </h3>
                          <p className="text-green-200 font-mono text-sm">iOS & Android</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Native and cross-platform mobile solutions that feel fluid and intuitive. From consumer apps to enterprise mobility instruments.
                      </p>
                    </div>
                  </TiltCard>
                </div>
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/app dev.webp"
                    alt="Mobile Development"
                    fill
                    className="object-cover rounded-full border-4 border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                  />
                </div>
              </motion.div>

              {/* AI */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="flex-1">
                  <TiltCard spotlight={true} spotlightColor="rgba(168, 85, 247, 0.2)">
                    <div className="bg-black/80 p-10 rounded-2xl border border-purple-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-purple-900/20 text-purple-400">
                          <FaBrain className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
                            Artificial Intelligence
                          </h3>
                          <p className="text-purple-200 font-mono text-sm">The Core Brain</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Deploying LLMs, computer vision, and predictive analytics. We integrate intelligence into every layer of your digital ecosystem.
                      </p>
                    </div>
                  </TiltCard>
                </div>
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/AI.webp"
                    alt="Artificial Intelligence"
                    fill
                    className="object-cover rounded-full border-4 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                  />
                </div>
              </motion.div>

              {/* Blockchain - BOOSTED */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
                <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.3)" className="relative">
                  <div className="bg-black/90 p-12 rounded-3xl border-2 border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.2)]">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 rounded-xl bg-cyan-900/30 text-cyan-400 border border-cyan-500/30">
                            <FaLink className="w-10 h-10" />
                          </div>
                          <div>
                            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300">
                              BLOCKCHAIN & WEB3
                            </h3>
                            <p className="text-cyan-200 font-mono text-lg tracking-wider">Decentralized Infrastructure</p>
                          </div>
                        </div>

                        <p className="text-gray-200 leading-relaxed text-lg mb-8">
                          We engineer trustless enterprise ecosystems. From <strong className="text-cyan-300">Smart Contracts</strong> and <strong className="text-cyan-300">DeFi protocols</strong> to <strong className="text-cyan-300">Immutable Ledgers</strong> and <strong className="text-cyan-300">Tokenization</strong>, we empower your business to operate with mathematical certainty and absolute transparency.
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {['Smart Contracts', 'DeFi', 'NFTs', 'L2 Scaling', 'Audits', 'DAOs'].map((tag, i) => (
                            <span key={i} className="px-4 py-2 rounded-lg bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-mono hover:bg-cyan-800/50 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="w-64 h-64 relative flex-shrink-0">
                        <Image
                          src="/images/blockchain.webp"
                          alt="Blockchain"
                          fill
                          className="object-cover rounded-2xl border-4 border-cyan-500/50 shadow-[0_0_60px_rgba(34,211,238,0.6)]"
                        />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blockchain Protocols */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Blockchain Protocols & Standards
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Expertise across the entire distributed ledger ecosystem
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Public Chains',
                  items: ['Ethereum', 'Solana', 'Bitcoin', 'Cardano'],
                  image: '/images/blockchain/ethereum.png',
                  color: 'cyan'
                },
                {
                  title: 'Enterprise & Private',
                  items: ['Hyperledger Fabric', 'R3 Corda', 'Quorum'],
                  image: '/images/blockchain.webp',
                  color: 'blue'
                },
                {
                  title: 'Layer 2 Scaling',
                  items: ['Polygon', 'Arbitrum', 'Optimism', 'zkSync'],
                  image: '/images/blockchain/layer2.png',
                  color: 'purple'
                },
                {
                  title: 'Development Tech',
                  items: ['Solidity', 'Rust', 'Web3.js', 'IPFS'],
                  image: '/images/digital_ecosystem.webp',
                  color: 'green'
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TiltCard spotlight={true} spotlightColor="rgba(255, 255, 255, 0.1)" className="h-full">
                    <div className="h-full p-6 rounded-xl bg-black/60 border border-white/5 hover:border-cyan-500/30 transition-all group backdrop-blur-sm">
                      <div className="mb-6 h-16 w-16 relative">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-400 text-sm">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden">
          <LiveBackground src="/images/hand-ai.webp" opacity={0.3} />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto bg-black/50 backdrop-blur-xl rounded-[2rem] p-16 border border-white/10 shadow-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Transform?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let&apos;s build the future together
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="btn-primary px-8 py-4 text-lg">
                  Start Free Trial
                </Link>
                <Link href="/contact" className="btn-outline px-8 py-4 text-lg bg-black/50 backdrop-blur-md">
                  Schedule Demo
                </Link>
              </div>
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
      </div>
    </>
  );
}