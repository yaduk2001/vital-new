'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import LiveBackground from '../../components/LiveBackground';
import Particles from '../../components/Particles';
import { FaHandshake, FaChartLine, FaBullhorn, FaBalanceScale, FaLightbulb, FaLeaf, FaAward, FaGlobe, FaRocket } from 'react-icons/fa';

export default function ConsultancyPage() {


  const sections = [
    {
      title: 'Client Acquisition & Growth',
      description: [
        'New client sourcing via extensive networks.',
        'Strategic B2B partnerships.',
        'Global market entry support (Australia, UK).',
        'Proposal, pitch, and quotation assistance.',
        'Targeted cold outreach campaigns.',
        'Direct project sourcing from existing clients.'
      ],
      icon: <FaHandshake className="text-4xl text-cyan-400 drop-shadow-lg" />,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Operational Excellence',
      description: [
        'Talent planning, hiring & onboarding support.',
        'Financial tracking, reporting & budgeting.',
        'Project management workflow advisory.'
      ],
      icon: <FaChartLine className="text-4xl text-green-400 drop-shadow-lg" />,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Marketing & Brand Authority',
      description: [
        'Comprehensive brand strategy & virtual branding.',
        'Full-spectrum social media marketing management.',
        'Advanced SEO optimization & website enhancement.',
        'Integrated advertising campaigns (digital & IRL).',
        '2D & 3D creative content development.'
      ],
      icon: <FaBullhorn className="text-4xl text-pink-400 drop-shadow-lg" />,
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Legal & Compliance Safeguards',
      description: [
        'Drafting of NDAs, MoUs, contracts, SLAs.',
        'Guidance on IP, copyright & licensing.',
        'International contract & tax implications.'
      ],
      icon: <FaBalanceScale className="text-4xl text-yellow-400 drop-shadow-lg" />,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Technology & Innovation Advisory',
      description: [
        'AI tool integration & optimization.',
        'Cost-effective software stack recommendations.',
        'Emerging tech landscape analysis.'
      ],
      icon: <FaLightbulb className="text-4xl text-indigo-400 drop-shadow-lg" />,
      gradient: 'from-indigo-500 to-cyan-500',
    },
    {
      title: 'Sustainability & ESG Advisory',
      description: [
        'Sustainable business model development.',
        'ESG (Environmental, Social, Governance) compliance guidance.',
        'Green innovation and reporting support.'
      ],
      icon: <FaLeaf className="text-4xl text-lime-400 drop-shadow-lg" />,
      gradient: 'from-green-400 to-lime-500',
    },
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
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <LiveBackground src="/images/hero-bg-1.webp" opacity={0.5} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center bg-gradient-to-br from-[#0A0F1A]/80 via-[#1A2332]/60 via-[#0F2A1A]/70 to-[#0A0F1A]/80 backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-2xl">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 glow-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                AI <span className="text-gradient-primary">Consultancy</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Expert guidance to transform your business with cutting-edge AI solutions tailored to your specific needs.
              </motion.p>
              <motion.button
                className="btn-primary neon-border px-8 py-4 text-lg font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Get Started Today
              </motion.button>
            </div>
          </div>
        </section>

        {/* Features/Services Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {sections.map((section, idx) => (
                <div
                  key={section.title}
                  className="group relative bg-[#0A0A0A] rounded-2xl p-10 h-full overflow-hidden shadow-2xl border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue via-accent-blueMedium to-accent-blueLight shadow-lg group-hover:from-accent-blue group-hover:to-accent-blueMedium transition-all duration-300 glow-effect">
                    {section.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent glow-text`}>
                    {section.title}
                  </h3>
                  <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside space-y-1 text-left text-base">
                    {section.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features/Badges Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3 bg-[#0A0A0A] rounded-xl px-6 py-4 shadow border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <FaAward className="text-2xl text-accent-blue" />
                <span className="font-semibold text-blue-400">Award-Winning Expertise</span>
              </div>
              <div className="flex items-center gap-3 bg-[#0A0A0A] rounded-xl px-6 py-4 shadow border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <FaGlobe className="text-2xl text-accent-blue" />
                <span className="font-semibold text-blue-400">Global Reach</span>
              </div>
              <div className="flex items-center gap-3 bg-[#0A0A0A] rounded-xl px-6 py-4 shadow border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <FaRocket className="text-2xl text-accent-blue" />
                <span className="font-semibold text-blue-400">Proven Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-16 lg:py-24 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-blue mb-4 glow-text">What Our Clients Say</h2>
              <p className="text-lg text-gray-300">Trusted by global leaders for our expertise, innovation, and results-driven approach.</p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-[#0A0A0A] rounded-2xl p-8 text-center shadow-lg border border-white/5 hover:border-white/10 transition-colors animate-fade-in">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-accent-blue mb-2 glow-text">&quot;Supe AI&apos;s consultancy team helped us scale globally and optimize our operations. Highly recommended!&quot;</h3>
                <p className="text-gray-300 text-sm mt-2">— Alex Morgan, COO, GlobalTech</p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating CTA Button */}
        <a href="/contact" className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 text-black font-bold shadow-2xl border-2 border-green-300 hover:border-green-400 transition-all duration-300 text-lg py-4 px-10 rounded-full animate-pulse hover:scale-105">
          Contact Our Experts
        </a>

        {/* Trust/Testimonials Section */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-200 mb-4">Why Choose Us?</h2>
              <p className="text-lg text-green-100">Trusted by global leaders for our expertise, innovation, and results-driven approach.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#0A0A0A] rounded-2xl p-8 text-center shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Global Reach</h3>
                <p className="text-green-100 text-sm">Supporting clients in Australia, UK, and worldwide.</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-2xl p-8 text-center shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Expert Team</h3>
                <p className="text-green-100 text-sm">Seasoned consultants with deep industry knowledge.</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-2xl p-8 text-center shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Proven Results</h3>
                <p className="text-green-100 text-sm">Delivering measurable growth and operational excellence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative z-10 overflow-hidden">
          <LiveBackground src="/images/hand-ai.webp" opacity={0.4} />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 mb-6 animate-gradient-x">
                Ready to Elevate Your Business?
              </h2>
              <p className="text-lg text-green-100 mb-8">
                Let&apos;s discuss how our consultancy services can drive growth and innovation for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary bg-gradient-to-r from-green-400 via-emerald-400 to-lime-300 text-black font-bold shadow-lg hover:from-green-500 hover:to-lime-400 border-2 border-green-300 hover:border-green-400 transition-all duration-300 text-lg py-4 px-10 rounded-full animate-pulse"
                >
                  Contact Us
                </a>
                <a
                  href="/services"
                  className="btn-outline border-green-300 text-green-200 hover:bg-green-400/10 hover:text-green-300 transition-all duration-300 text-lg py-4 px-10 rounded-full"
                >
                  Explore All Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#00FFC2]/30 bg-[#051A05]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#D1FFE6]">
              © 2024 Supe AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
