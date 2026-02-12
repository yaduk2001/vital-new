'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import LiveBackground from '../../components/LiveBackground';
import TiltCard from '../../components/TiltCard';
import { FaRocket, FaBolt, FaGlobe, FaBrain, FaTrophy } from 'react-icons/fa';

export default function AboutPage() {
  const timeline = [
    {
      year: "2020",
      title: "Foundation",
      description: "Supe AI was founded with a vision to democratize artificial intelligence and make cutting-edge technology accessible to enterprises worldwide.",
      icon: <FaRocket className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-400"
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Released our flagship AI automation platform to early adopters, revolutionizing how businesses interact with intelligent systems.",
      icon: <FaBolt className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-400"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve clients across 25+ countries worldwide, establishing ourselves as a truly global AI solutions provider.",
      icon: <FaGlobe className="w-6 h-6" />,
      color: "from-green-400 to-emerald-400"
    },
    {
      year: "2023",
      title: "AI Breakthrough",
      description: "Achieved breakthrough in real-time multilingual AI processing, setting new industry standards for speed and accuracy.",
      icon: <FaBrain className="w-6 h-6" />,
      color: "from-purple-400 to-pink-400"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as a leading AI solutions provider for enterprises, trusted by Fortune 500 companies and innovative startups alike.",
      icon: <FaTrophy className="w-6 h-6" />,
      color: "from-amber-400 to-yellow-400"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] relative overflow-hidden">

        {/* Hero Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 mt-20 overflow-hidden">
          <LiveBackground src="/images/hero-bg-1.webp" opacity={0.15} blur="blur-sm" />

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
                className="inline-block mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md"
              >
                <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">Our Story</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-400">
                About Supe AI
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Pioneering the future of artificial intelligence with cutting-edge solutions that transform businesses and empower innovation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
          <LiveBackground src="/images/robot-ai.webp" opacity={0.1} blur="blur-sm" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full">
                  <div className="h-full bg-black/60 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all">
                    <div className="mb-6">
                      <div className="inline-block p-4 rounded-xl bg-blue-900/20 text-blue-400 border border-blue-500/30 mb-4">
                        <FaBrain className="w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Our Mission
                      </h2>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      To democratize artificial intelligence by providing accessible, powerful, and ethical AI solutions that drive innovation across industries. We believe that AI should be a force for good, enhancing human capabilities while maintaining the highest standards of security and privacy.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <TiltCard spotlight={true} spotlightColor="rgba(34, 197, 94, 0.2)" className="h-full">
                  <div className="h-full bg-black/60 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-green-500/30 transition-all">
                    <div className="mb-6">
                      <div className="inline-block p-4 rounded-xl bg-green-900/20 text-green-400 border border-green-500/30 mb-4">
                        <FaRocket className="w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        Our Vision
                      </h2>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      To become the world&apos;s most trusted AI partner, pushing the boundaries of what&apos;s possible with intelligent systems. We envision a future where AI seamlessly integrates into every aspect of business, creating unprecedented value and sustainable growth for organizations worldwide.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
                <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-16 border border-white/10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                  />

                  <div className="relative z-10">
                    <div className="text-6xl mb-8">💡</div>
                    <blockquote className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
                      &quot;Built up with intent. Scaled with the precision&quot;
                    </blockquote>
                    <p className="text-xl text-gray-400">
                      — Supe AI Team
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-32 relative border-t border-white/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From startup to industry leader - the milestones that shaped our growth
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 origin-top"
                />

                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                      viewport={{ once: true }}
                      className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]`}></div>
                    </motion.div>

                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <TiltCard spotlight={true} spotlightColor="rgba(255, 255, 255, 0.1)">
                        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                                {item.year}
                              </div>
                              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                      </TiltCard>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden border-t border-white/5">
          <LiveBackground src="/images/hand-ai.webp" opacity={0.3} />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto bg-black/50 backdrop-blur-xl rounded-[2rem] p-16 border border-white/10 shadow-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Mission?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let&apos;s work together to transform your business with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/test" className="btn-primary px-8 py-4 text-lg">
                  Try Our API
                </Link>
                <Link href="/contact" className="btn-outline px-8 py-4 text-lg bg-black/50 backdrop-blur-md">
                  Get in Touch
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