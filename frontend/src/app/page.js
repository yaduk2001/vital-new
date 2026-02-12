'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import FuturisticBackground from '../components/FuturisticBackground';
import Navbar from '../components/Navbar';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import LiveBackground from '../components/LiveBackground';
import { FaLink, FaChartLine, FaBolt, FaLanguage, FaBullhorn, FaShieldAlt, FaArrowRight, FaCogs, FaBrain, FaNetworkWired, FaPlay, FaPause } from 'react-icons/fa';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect sequence
  const typingSequence = [
    "Supe AI delivers scalable, multilingual, real-time automation",
    2000,
    "Transform your business with cutting-edge AI & Blockchain",
    2000,
    "Intelligent solutions for the modern enterprise",
    2000,
    "Empowering enterprises with next-generation Web3",
    2000
  ];

  const services = [
    {
      icon: <FaLink className="w-8 h-8 text-cyan-400" />,
      title: "Blockchain & Web3",
      description: "Decentralized architectures, smart contracts, and tokenomics. Building the trust layer of the internet.",
      gradient: "from-cyan-400 to-indigo-500",
      features: ["Smart Contracts", "DApps", "Tokenization"],
      color: "cyan",
      spotlight: "rgba(34, 211, 238, 0.2)"
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-orange-400" />,
      title: "Customer Insights AI",
      description: "Unlock actionable insights from your customer data with advanced AI analytics and segmentation.",
      gradient: "from-orange-500 to-pink-500",
      features: ["Customer Analytics", "Segmentation", "Predictive Insights"],
      color: "orange",
      spotlight: "rgba(251, 146, 60, 0.2)"
    },
    {
      icon: <FaBolt className="w-8 h-8 text-cyan-400" />,
      title: "Real-Time AI",
      description: "Get instant insights and responses with our real-time AI processing capabilities.",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Instant Processing", "Live Analytics", "Real-time Insights"],
      color: "cyan",
      spotlight: "rgba(6, 182, 212, 0.2)"
    },
    {
      icon: <FaLanguage className="w-8 h-8 text-green-400" />,
      title: "Multilingual AI",
      description: "Break language barriers with our advanced multilingual AI that understands and responds in any language.",
      gradient: "from-green-500 to-emerald-500",
      features: ["50+ Languages", "Cultural Context", "Accurate Translation"],
      color: "green",
      spotlight: "rgba(74, 222, 128, 0.2)"
    },
    {
      icon: <FaBullhorn className="w-8 h-8 text-pink-400" />,
      title: "AI-Powered Marketing",
      description: "Boost your brand and reach with AI-driven marketing automation, analytics, and personalization.",
      gradient: "from-pink-500 to-red-500",
      features: ["Campaign Automation", "Audience Insights", "Personalized Content"],
      color: "pink",
      spotlight: "rgba(244, 114, 182, 0.2)"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-yellow-400" />,
      title: "Data Security & Compliance",
      description: "Protect your business with advanced AI-driven security and compliance solutions.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["AI Security", "Compliance Automation", "Risk Management"],
      color: "yellow",
      spotlight: "rgba(250, 204, 21, 0.2)"
    },
  ];

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/testimonials`);
        if (res.ok) {
          const data = await res.json();
          setTestimonialsData(data.testimonials || []);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handeTabClick = (index) => {
    setActiveTestimonialIndex(index);
    setIsPlaying(false);
    // Audio will auto-update src, just need to reset play state
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1A] via-[#1A2332] via-[#0F2A1A] to-[#0A0F1A] overflow-hidden relative selection:bg-cyan-500/30">
      <FuturisticBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <LiveBackground src="/images/hero-bg-1.webp" opacity={0.5} blur="blur-md" />

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <span className="flex h-2 w-2 relative mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-sm font-medium text-cyan-200 tracking-wide uppercase">
                  Next-Gen Enterprise Intelligence
                </span>
              </motion.div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 leading-[1.1]"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Redefining
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x bg-300% pb-2">
                Digital Evolution
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-400 mb-12 h-16 max-w-3xl mx-auto font-light leading-relaxed"
            >
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={70}
                repeat={Infinity}
                cursor={true}
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
            >
              <Link href="/auth/signup">
                <MagneticButton className="w-full sm:w-auto">
                  <div className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2">
                    Get Started
                    <FaArrowRight className="text-sm" />
                  </div>
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton className="w-full sm:w-auto">
                  <div className="px-8 py-4 bg-black border border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-md">
                    Book Demo
                  </div>
                </MagneticButton>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* New Workflow Section */}
      <section className="py-20 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-6">
              The Architecture
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              How Supe AI transforms raw data into actionable intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2 z-0" />

            {[
              { icon: <FaNetworkWired />, title: "Ingest", desc: "Connect data sources securely via API or decentralized nodes." },
              { icon: <FaBrain />, title: "Process", desc: "AI Models analyze patterns in real-time with zero latency." },
              { icon: <FaCogs />, title: "Execute", desc: "Autonomous agents trigger workflows and smart contracts." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <TiltCard spotlight={true} spotlightColor="rgba(6, 182, 212, 0.15)" className="h-full">
                  <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl h-full flex flex-col items-center text-center hover:border-cyan-500/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center text-2xl text-cyan-400 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned Grid */}
      <section className="py-20 lg:py-32 relative z-10 overflow-hidden">
        <LiveBackground src="/images/tech-bg-2.webp" opacity={0.15} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive suite of intelligence modules designed for the future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard spotlight={true} spotlightColor={service.spotlight} className="h-full">
                  <div className="h-full flex flex-col p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <span className="font-mono text-xs text-gray-600">0{index + 1}</span>
                    </div>

                    <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${service.gradient}`}>
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Grid */}
      <section className="py-20 lg:py-32 relative bg-black/40 border-t border-white/5">
        <LiveBackground src="/images/robot-ai.webp" opacity={0.2} blur="blur-sm" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The AI Advantage
            </h2>
            <p className="text-xl text-gray-400">
              Built on a foundation of next-generation intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {/* Large Card: Neural Network */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-4 h-full">
              <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full">
                <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 rounded-xl bg-blue-900/10 text-blue-400">
                      <span className="text-3xl">🧠</span>
                    </div>
                    <span className="text-xs font-mono text-blue-500/50">INTELLIGENCE_CORE_V2.1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-wide">Autonomous Evolution</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    Our AI agents don&apos;t just process; they adapt. Featuring self-optimizing recursive workflows.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Small Card: Speed */}
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 h-full">
              <TiltCard spotlight={true} spotlightColor="rgba(16, 185, 129, 0.2)" className="h-full">
                <div className="h-full flex flex-col p-10 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="p-4 rounded-xl bg-emerald-900/10 text-emerald-400 w-fit mb-8">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">Zero Latency</h3>
                  <p className="text-gray-400 text-sm">Real-time inference at the edge.</p>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dynamic Audio Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <LiveBackground src="/images/hand-ai.webp" opacity={0.2} blur="blur-md" />

        {/* Floating Background Shapes */}
        <motion.div
          animate={{ x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none z-0"
        />
        <motion.div
          animate={{ x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none z-0"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Stories
            </h2>
            <p className="text-xl text-gray-400">
              Listen to what our partners say about Supe AI
            </p>
          </motion.div>

          {testimonialsData.length > 0 ? (
            <div className="max-w-5xl mx-auto">
              {/* Main Content Area */}
              <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-center">
                {/* Image & Player Card */}
                <motion.div
                  key={activeTestimonialIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative group w-full md:w-1/2 aspect-square max-w-[320px]"
                >
                  <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.3)" className="h-full">
                    <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative shadow-2xl">
                      {/* Background Image */}
                      {testimonialsData[activeTestimonialIndex].photoUrl ? (
                        <img
                          src={testimonialsData[activeTestimonialIndex].photoUrl}
                          alt={testimonialsData[activeTestimonialIndex].name}
                          className="w-full h-full object-cover opacity-100 group-hover:brightness-110 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                          <span className="text-5xl">👤</span>
                        </div>
                      )}

                      {/* Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                          onClick={handlePlayPause}
                          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                          {isPlaying ? <FaPause className="ml-0.5" /> : <FaPlay className="ml-1" />}
                        </button>
                      </div>

                      {/* Audio Element */}
                      {testimonialsData[activeTestimonialIndex].audioUrl && (
                        <audio
                          ref={audioRef}
                          src={testimonialsData[activeTestimonialIndex].audioUrl}
                          onEnded={() => setIsPlaying(false)}
                          className="hidden"
                        />
                      )}

                      {/* Info Overlay at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-0.5">
                          {testimonialsData[activeTestimonialIndex].name}
                        </h3>
                        <p className="text-cyan-400 text-xs font-medium tracking-wider uppercase">
                          {testimonialsData[activeTestimonialIndex].post || 'Client'}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* Details Section (Optional Text) */}
                {/* If there's a message, show it here? Or just focus on audio?
                    User said "Listen to that... Instead of round image use square shape".
                    I'll keep it simple: Just the main card is the hero. 
                    But maybe I can show the message on the side if available. 
                */}
              </div>

              {/* Tabs / Thumbnails */}
              <div className="flex flex-wrap justify-center gap-4">
                {testimonialsData.map((t, index) => (
                  <button
                    key={t.id}
                    onClick={() => handeTabClick(index)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeTestimonialIndex === index
                      ? 'border-cyan-500 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                  >
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs">
                        {t.name[0]}
                      </div>
                    )}
                    {/* Active Indicator */}
                    {activeTestimonialIndex === index && (
                      <div className="absolute inset-0 bg-cyan-500/20" />
                    )}
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Connect with admin to add testimonials.</p>
            </div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative z-10 overflow-hidden">
        <LiveBackground src="/images/tech-bg-2.webp" opacity={0.3} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto bg-black/50 backdrop-blur-xl rounded-[2rem] p-16 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Transform?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 relative z-10">
              Join the future of enterprise intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
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

      {/* Contact Information Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400">
              Ready to transform your business? Let&apos;s start a conversation about how we can help you achieve your goals.
            </p>
          </motion.div>

          {/* Combined Contact Grid */}
          {/* Combined Contact Grid */}
          {/* Combined Contact Grid */}
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-8">
            {/* Email */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="/images/gmail.svg" alt="Gmail" className="h-8 w-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-blue-400">Email</span>
                  </h3>
                  <a href="mailto:hello@supeai.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                    hello@supeai.in
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* India Flag & Phone */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(249, 115, 22, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="https://flagcdn.com/in.svg" alt="India Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-orange-400">India</span>
                  </h3>
                  <a href="tel:+918075851517" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +91 8075851517
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* UK Flag & Phone */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(239, 68, 68, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-red-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-red-400">UK</span>
                  </h3>
                  <a href="tel:+447404465149" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +44 7404 465149
                  </a>
                </div>
              </TiltCard>
            </div>



            {/* Australia Flag & Phone */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(59, 130, 246, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="https://flagcdn.com/au.svg" alt="Australia Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-blue-400">Australia</span>
                  </h3>
                  <a href="tel:+61468371679" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +61 468 371679
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* Dubai Flag & Phone */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(34, 197, 94, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="https://flagcdn.com/ae.svg" alt="UAE Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-red-400">Dubai</span>
                  </h3>
                  <a href="tel:+971569779819" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +971 56 977 9819
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* Germany Flag & Phone */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <TiltCard spotlight={true} spotlightColor="rgba(234, 179, 8, 0.2)">
                <div className="h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-yellow-500/30 transition-all text-center group">
                  <div className="h-10 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="https://flagcdn.com/de.svg" alt="Germany Flag" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <span className="text-yellow-400">Germany</span>
                  </h3>
                  <a href="tel:+4917632420097" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +49 176 32420097
                  </a>
                </div>
              </TiltCard>
            </div>


          </div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mt-6"
          >
            <a
              href="https://www.linkedin.com/company/supe-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all"
            >
              <svg className="w-5 h-5 text-gray-300 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://t.me/+UD-_HA-hjqYyYTc9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
            >
              <svg className="w-5 h-5 text-gray-300 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.264-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-center relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-sm">
            © 2024 Supe AI. All rights reserved. Built with ❤️ for the Future.
          </p>
        </div>
      </footer>
    </div>
  );
}
