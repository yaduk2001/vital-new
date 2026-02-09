'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const timeline = [
    {
      year: "2020",
      title: "Foundation",
      description: "Supe AI was founded with a vision to democratize artificial intelligence.",
      icon: "🚀"
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Released our flagship AI automation platform to early adopters.",
      icon: "⚡"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve clients across 25+ countries worldwide.",
      icon: "🌍"
    },
    {
      year: "2023",
      title: "AI Breakthrough",
      description: "Achieved breakthrough in real-time multilingual AI processing.",
      icon: "🧠"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as a leading AI solutions provider for enterprises.",
      icon: "🏆"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Founder",
      avatar: "👩‍💼",
      description: "AI researcher with 15+ years in machine learning"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "👨‍💻",
      description: "Former Google AI engineer, expert in neural networks"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Research",
      avatar: "👩‍🔬",
      description: "PhD in Computer Science, specialized in NLP"
    },
    {
      name: "Alex Thompson",
      role: "VP of Engineering",
      avatar: "👨‍🔧",
      description: "Scaled engineering teams at multiple tech companies"
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      avatar: "👩‍💼",
      description: "Product leader with focus on AI-driven solutions"
    },
    {
      name: "David Kim",
      role: "VP of Sales",
      avatar: "👨‍💼",
      description: "Enterprise sales expert in AI and automation"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const quoteVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                About <span className="text-gradient-primary">Supe AI</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Pioneering the future of artificial intelligence with cutting-edge solutions that transform businesses and empower innovation.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#0A0F1A]/30 via-[#1A2332]/20 via-[#0F2A1A]/25 to-[#0A0F1A]/30 rounded-3xl p-8 border border-white/10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
                <div className="bg-[#0A0A0A] rounded-2xl p-12 border border-white/5 hover:border-white/10 transition-colors shadow-2xl">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    To democratize artificial intelligence by providing accessible, powerful, and ethical AI solutions that drive innovation across industries. We believe that AI should be a force for good, enhancing human capabilities while maintaining the highest standards of security and privacy.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#1A2332]/20 via-[#0A0F1A]/30 via-[#0F2A1A]/20 to-[#1A2332]/20 rounded-3xl p-8 border border-white/10">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Vision</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Innovation</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Pushing the boundaries of what&apos;s possible with AI, creating solutions that were once thought impossible.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-accent-green">Sustainability</h3>
                    <p className="text-gray-300">
                      Building AI solutions that are environmentally conscious and contribute to a sustainable future.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Glowing Divider */}
        <div className="relative py-8">
          <div className="h-px bg-gradient-to-r from-transparent via-accent-blue via-accent-green to-transparent glow-effect"></div>
        </div>

        {/* Animated Quote */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              variants={quoteVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="bg-[#0A0A0A] rounded-2xl p-12 border border-white/5 relative overflow-hidden shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-accent-cyan/20 to-accent-green/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-accent-mint/20 to-accent-cyan/20 rounded-full blur-3xl"
                />

                <div className="relative z-10">
                  <div className="text-6xl mb-6">💡</div>
                  <blockquote className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    &quot;Innovation is our DNA&quot;
                  </blockquote>
                  <p className="text-xl text-gray-300">
                    — Supe AI Team
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Our Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From startup to industry leader - the milestones that shaped our growth
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-blue to-accent-blueMedium"></div>

                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-accent-blue rounded-full shadow-glow z-10"></div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                      }`}>
                      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 relative">
                        <div className="flex items-center mb-4">
                          <div className="text-2xl mr-4">{item.icon}</div>
                          <div>
                            <div className="text-accent-blue font-bold text-lg">{item.year}</div>
                            <h3 className="text-xl font-semibold text-blue-400">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Join Our Mission?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let&#39;s work together to transform your business with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/test"
                  className="btn-primary"
                >
                  Try Our API
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline"
                >
                  Get in Touch
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