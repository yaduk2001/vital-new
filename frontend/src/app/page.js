'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FuturisticBackground from '../components/FuturisticBackground';
import Navbar from '../components/Navbar';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect sequence for TypeAnimation component
  const typingSequence = [
    "Supe AI delivers scalable, multilingual, real-time automation",
    2000,
    "Transform your business with cutting-edge AI technology",
    2000,
    "Intelligent solutions for the modern enterprise",
    2000,
    "Empowering enterprises with next-generation AI",
    2000
  ];



  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-4v-4m0 0V8m0 4h4m-4 0H8" />
        </svg>
      ),
      title: "Customer Insights AI",
      description: "Unlock actionable insights from your customer data with advanced AI analytics and segmentation.",
      gradient: "from-orange-500 to-pink-500",
      features: ["Customer Analytics", "Segmentation", "Predictive Insights"],
      color: "orange"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-Time AI",
      description: "Get instant insights and responses with our real-time AI processing capabilities.",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Instant Processing", "Live Analytics", "Real-time Insights"],
      color: "cyan"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: "Multilingual AI",
      description: "Break language barriers with our advanced multilingual AI that understands and responds in any language.",
      gradient: "from-green-500 to-emerald-500",
      features: ["50+ Languages", "Cultural Context", "Accurate Translation"],
      color: "green"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: "AI-Powered Marketing",
      description: "Boost your brand and reach with AI-driven marketing automation, analytics, and personalization.",
      gradient: "from-pink-500 to-red-500",
      features: ["Campaign Automation", "Audience Insights", "Personalized Content"],
      color: "pink"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
        </svg>
      ),
      title: "Data Security & Compliance",
      description: "Protect your business with advanced AI-driven security and compliance solutions.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["AI Security", "Compliance Automation", "Risk Management"],
      color: "yellow"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Inc",
      content: "Supe AI transformed our customer service operations. Response times improved by 80% while maintaining quality.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, Global Solutions",
      content: "The multilingual capabilities are incredible. We can now serve customers in 15 different languages seamlessly.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI, InnovateCorp",
      content: "The real-time processing and automation features have revolutionized our workflow. Highly recommended!",
      avatar: "👩‍🔬",
      rating: 5
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };



  return (
    <div className="min-h-screen bg-gradient-primary overflow-hidden relative">
      {/* Reusable Futuristic Background */}
      <FuturisticBackground />

      {/* Enhanced Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent-blue rounded-full opacity-60 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-blueMedium rounded-full opacity-40 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-accent-blueLight rounded-full opacity-50 glow-effect"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-accent-blue rounded-full opacity-30 glow-effect"
        />
      </div>

      {/* Reusable Navbar */}
      <Navbar />

      {/* Hero Section - Redesigned for Maximum Impact */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Massive Glow Orb Behind Content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-blue-900/5 to-transparent rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto flex flex-col items-center"
          >
            {/* Ultra-Modern Pill Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-5 py-2 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md mb-12 shadow-[0_0_20px_rgba(20,110,233,0.3)] hover:shadow-[0_0_30px_rgba(20,110,233,0.5)] transition-all duration-500 group cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></span>
              </span>
              <span className="text-sm font-medium text-cyan-100 tracking-wide group-hover:text-white transition-colors">
                AI-Powered Enterprise Solutions
              </span>
            </motion.div>

            {/* Main Heading - Massive & Impactful */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-[1.1] font-heading drop-shadow-2xl relative z-10"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                Transforming
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient-x bg-300%">
                Enterprises
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-white">
                with AI
              </span>
            </motion.h1>

            {/* Type Animation Subheading - Clean & Minimal */}
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-200/80 mb-16 h-12 font-light tracking-wide max-w-2xl"
            >
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={60}
                repeat={Infinity}
                className="inline-block"
                cursor={true}
              />
            </motion.div>

            {/* High-Tech CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full max-w-md mx-auto"
            >
              <Link href="/auth/signup" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center space-x-3 border border-white/10 group-hover:bg-gray-900 transition duration-300">
                  <span className="text-white font-bold group-hover:text-cyan-300 transition-colors">Get Started</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-300 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </Link>

              <Link href="/chat" className="group relative w-full sm:w-auto">
                <div className="px-8 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center space-x-3 hover:bg-white/10 transition duration-300 hover:border-white/20">
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Chat with AI</span>
                </div>
              </Link>
            </motion.div>

            {/* Scroll Indicator - Minimalist */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Business Consultancy Panel */}
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-blue-600/30">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-blue/20 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Business Consultancy</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                      Unlock growth, operational excellence, and global market access with Supe AI&apos;s expert business consultancy. From client acquisition to legal, marketing, and tech innovation, our team empowers your business to thrive in any market.
                    </p>
                    <Link href="/consultancy" className="btn-primary inline-flex items-center group">
                      Learn More
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent-blue/20 blur-2xl rounded-full" />
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                        <svg className="w-20 h-20 md:w-28 md:h-28 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Capabilities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our AI solutions can transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  {/* Minimalist Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-white/5 text-${service.color}-400`}>
                      {service.icon}
                    </div>
                    {/* Subtle numbering or decorative icon */}
                    <span className="text-xs font-mono text-gray-700 group-hover:text-gray-500 transition-colors">0{index + 1}</span>
                  </div>

                  {/* Title with Permanent Gradient */}
                  <h3 className={`text-xl font-semibold mb-3 tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div className={`w-full h-px bg-gradient-to-r ${service.gradient} opacity-20 mb-6`} />

                  {/* Feature List */}
                  <div className="space-y-3">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}-500 mr-2`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Business Consultancy Minimalist Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="h-full group"
            >
              <Link href="/consultancy" className="block h-full">
                <div className="relative h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-lg bg-blue-900/20 text-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>

                  <h3 className="text-xl font-semibold text-blue-400 mb-3 tracking-wide">Business Consultancy</h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    Strategic guidance for acquisition, operations, and tech innovation.
                  </p>

                  <div className="w-full h-px bg-blue-900/30 mb-6" />

                  <div className="inline-flex items-center text-xs font-medium text-blue-400 uppercase tracking-widest">
                    Explore Services
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intelligence Grid (Replaces old Stats) */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The AI Advantage
            </h2>
            <p className="text-xl text-gray-300">
              Built on a foundation of next-generation intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {/* Large Card: Neural Network */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-4 h-full"
            >
              <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-xl bg-blue-900/10 text-blue-400">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <span className="text-xs font-mono text-blue-500/50">INTELLIGENCE_CORE_V2.1</span>
                </div>

                <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-wide">Autonomous Evolution</h3>
                <div className="w-12 h-1 bg-blue-500 mb-6" />

                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                  Our AI agents don&apos;t just process; they adapt. Featuring self-optimizing recursive workflows that improve with every interaction, ensuring your business intelligence gets smarter every single day.
                </p>
              </div>
            </motion.div>

            {/* Small Card: Speed */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 h-full"
            >
              <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                <div className="p-4 rounded-xl bg-emerald-900/10 text-emerald-400 w-fit mb-8">
                  <span className="text-3xl">⚡</span>
                </div>

                <h3 className="text-2xl font-bold text-emerald-400 mb-2 tracking-wide">Zero Latency</h3>
                <div className="w-12 h-1 bg-emerald-500 mb-4" />
                <p className="text-gray-400 text-sm mb-6">Real-time inference at the edge.</p>

                <div className="mt-auto h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-2/3 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Small Card: Language */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 h-full"
            >
              <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-orange-500/20 transition-all duration-300">
                <div className="p-4 rounded-xl bg-orange-900/10 text-orange-400 w-fit mb-8">
                  <span className="text-3xl">🗣️</span>
                </div>

                <h3 className="text-2xl font-bold text-orange-400 mb-4 tracking-wide">Native Speaker</h3>
                <div className="text-xl font-mono font-bold text-orange-400">
                  <TypeAnimation
                    sequence={[
                      'Hello', 1500, 'Bonjour', 1500, 'Hola', 1500,
                      'Namaste', 1500, 'Konnichiwa', 1500
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </div>
              </div>
            </motion.div>

            {/* Large Card: Security */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-4 h-full"
            >
              <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="p-4 rounded-xl bg-purple-900/10 text-purple-400">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <span className="text-xs font-mono text-purple-500/50">SECURE_ENCLAVE_ACTIVE</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4 tracking-wide">Fortress-Grade Security</h3>
                  <div className="w-12 h-1 bg-purple-500 mb-6" />
                  <div className="flex flex-wrap gap-3 mb-4">
                    {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'E2E Encryption'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-purple-500/30 text-xs font-medium text-purple-300 bg-purple-900/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl text-blue-500/30 font-serif mb-6">&ldquo;</div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow italic relative z-10">
                    {testimonial.content}
                  </p>

                  <div className="w-full h-px bg-white/5 mb-6" />

                  <div className="flex items-center">
                    <div className="text-3xl mr-4 bg-white/5 rounded-full w-12 h-12 flex items-center justify-center border border-white/5">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-blue-200 text-sm tracking-wide">{testimonial.name}</div>
                      <div className="text-xs text-blue-400 mt-1">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 to-transparent">
              <div className="bg-[#050505] backdrop-blur-2xl rounded-3xl p-12 md:p-20 text-center border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none" />

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                  Join hundreds of companies already using Supe AI to revolutionize their operations
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                  <Link href="/test" className="btn-primary min-w-[180px]">
                    Start Free Trial
                  </Link>
                  <Link href="/contact" className="btn-outline min-w-[180px] backdrop-blur-md">
                    Schedule Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business? Let&apos;s start a conversation about how we can help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900/10 transition-colors">
                  <img src="/images/gmail.svg" alt="Gmail" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  <span className="text-blue-500">E</span>
                  <span className="text-red-500">ma</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">l</span>
                </h3>
                <a href="mailto:contact@supeai.in" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  contact@supeai.in
                </a>
              </div>
            </motion.div>

            {/* India Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-900/10 transition-colors">
                  <span className="fi fi-in rounded shadow-sm opacity-80 group-hover:opacity-100" style={{ width: '32px', height: '24px', display: 'inline-block', backgroundSize: 'cover' }}></span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-500 to-blue-800">India</span>
                  {" "}
                  <span className="text-white">Of</span>
                  <span className="text-green-600">fice</span>
                </h3>
                <div className="flex flex-col items-center text-gray-400 text-sm">
                  <a href="tel:+918075851517" className="hover:text-blue-400 transition-colors mb-1">
                    +91 8075851517
                  </a>
                </div>
              </div>
            </motion.div>

            {/* UK Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-900/10 transition-colors">
                  <span className="fi fi-gb rounded shadow-sm opacity-80 group-hover:opacity-100" style={{ width: '32px', height: '24px', display: 'inline-block', backgroundSize: 'cover' }}></span>
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-600 mb-2">UK/London</h3>
                <a href="tel:+447404465149" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +44 7404 465149
                </a>
              </div>
            </motion.div>

            {/* Australia Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900/10 transition-colors">
                  <span className="fi fi-au rounded shadow-sm opacity-80 group-hover:opacity-100" style={{ width: '32px', height: '24px', display: 'inline-block', backgroundSize: 'cover' }}></span>
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-red-600 mb-2">Australia</h3>
                <a href="tel:+61468371679" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +61 468 371 679
                </a>
              </div>
            </motion.div>

            {/* Dubai Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-900/10 transition-colors">
                  <span className="fi fi-ae rounded shadow-sm opacity-80 group-hover:opacity-100" style={{ width: '32px', height: '24px', display: 'inline-block', backgroundSize: 'cover' }}></span>
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-white mb-2">Dubai</h3>
                <a href="tel:+971569779819" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +971 56 977 9819
                </a>
              </div>
            </motion.div>

            {/* Germany Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-900/10 transition-colors">
                  <span className="fi fi-de rounded shadow-sm opacity-80 group-hover:opacity-100" style={{ width: '32px', height: '24px', display: 'inline-block', backgroundSize: 'cover' }}></span>
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-600 to-gray-400 mb-2">Germany</h3>
                <a href="tel:+4917632420097" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +49 176 32420097
                </a>
              </div>
            </motion.div>
          </div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Kochi Office',
                gradient: 'from-orange-400 via-white to-green-400',
                addr: 'Edappally, Kochi, Kerala, India',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: 'Sydney Office',
                gradient: 'from-blue-600 via-white to-red-600',
                addr: '1/8 Arthur St, Ryde NSW 2112',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: 'London Office',
                gradient: 'from-red-500 via-white to-blue-600',
                addr: 'E16 3RU, London, UK',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                )
              },
              {
                title: 'Dubai Office',
                gradient: 'from-red-500 via-green-500 to-white',
                addr: 'Silicon Oasis Pineapple Tower, Dubai',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: 'Germany Office',
                gradient: 'from-yellow-400 via-red-600 to-gray-400',
                addr: 'Hegaustraße 54, 78239 Rielasingen-Worblingen',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                )
              }
            ].map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (idx * 0.1) }}
                viewport={{ once: true }}
                className="group w-full md:w-[calc(33.333%-1.5rem)] min-w-[280px]"
              >
                <div className="h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-300 items-center text-center hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:bg-blue-900/10 transition-colors">
                    {office.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${office.gradient}`}>{office.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{office.addr}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/company/supe-ai/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-blue transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://t.me/+UD-_HA-hjqYyYTc9" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-blue transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.264-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < footer className="py-12 border-t border-white/10" >
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Supe AI. All rights reserved.
          </p>
        </div>
      </footer >
    </div >
  );
}
