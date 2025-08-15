import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  LightBulbIcon, 
  GlobeAltIcon, 
  AcademicCapIcon,
  TrophyIcon,
  BeakerIcon,
  CheckCircleIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Footer from './Footer';
import { useTheme } from "../contexts/ThemeContext";

const AboutPage = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Trigger count-up animation when stats section is visible
  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('stats-about');
      if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
        setStartCount(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
    useEffect(() => {   // handle the no-scroll CSS class in the <body>
      if (isMobileMenuOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }, [isMobileMenuOpen]);

  const stats = [
    { label: 'Years of Excellence', value: 8, suffix: '+', icon: TrophyIcon },
    { label: 'Healthcare Professionals', value: 10000, suffix: '+', icon: UserGroupIcon },
    { label: 'Countries Served', value: 25, suffix: '+', icon: GlobeAltIcon },
    { label: 'Patient Satisfaction', value: 98.5, suffix: '%', icon: HeartIcon },
  ];

  const values = [
    {
      icon: HeartIcon,
      title: "Patient-Centered Care",
      description: "Every decision we make is guided by what's best for patients and their families.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Security & Privacy",
      description: "We maintain the highest standards of data security and patient privacy protection.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "Continuously pushing boundaries to create better healthcare solutions for tomorrow.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: UserGroupIcon,
      title: "Collaboration",
      description: "Fostering seamless communication between all healthcare stakeholders.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍⚕️",
      bio: "Former hospital administrator with 15+ years in healthcare technology",
      specialties: ["Healthcare Leadership", "Digital Transformation"]
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      image: "👨‍⚕️",
      bio: "Practicing physician and healthcare technology innovator",
      specialties: ["Clinical Excellence", "Medical Technology"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Engineering",
      image: "👩‍💻",
      bio: "Expert in secure healthcare systems and HIPAA compliance",
      specialties: ["System Architecture", "Security"]
    },
    {
      name: "Dr. James Wilson",
      role: "Head of Research",
      image: "👨‍🔬",
      bio: "Leading AI research in healthcare diagnostics and treatment",
      specialties: ["AI/ML", "Healthcare Research"]
    }
  ];

  const milestones = [
    { year: "2016", title: "Founded", description: "CareSync was born with a vision to transform healthcare" },
    { year: "2018", title: "First 1000 Providers", description: "Reached our first major milestone of healthcare providers" },
    { year: "2020", title: "Global Expansion", description: "Expanded to serve healthcare systems across 15 countries" },
    { year: "2022", title: "AI Integration", description: "Launched AI-powered diagnostic assistance features" },
    { year: "2024", title: "10K+ Providers", description: "Now serving over 10,000 healthcare professionals worldwide" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardHover = {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
           <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10">
                <img
                  src="/CareSync-Logo.png"
                  alt="CareSync Logo"
                  className="w-full h-full"
                />
              </div>
              <span
                className="ml-3 font-bold text-emerald-600 dark:text-emerald-400"
                style={{ fontSize: "1.375rem" }}
              >
                CareSync
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="flex gap-2 items-center text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="gradient-accent text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="relative md:hidden">
            <div className="absolute right-0 w-52 h-dvh pt-10 bg-white dark:bg-gray-900">
              {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-center py-3 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
              <div className="flex flex-col space-y-2 mt-20 px-3">
                {/* Dark Mode Toggle for Mobile */}
                <button
                  onClick={toggleTheme}
                  className="text-center py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
                <Link
                  to="/login"
                  className="text-center py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="gradient-accent text-white px-4 py-2 rounded-lg text-center font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 dark:from-teal-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0] 
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold shadow-sm mb-8"
            >
              🏥 Transforming Healthcare Since 2016
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-8"
            >
              About
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                {" "}CareSync
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            >
              We're on a mission to revolutionize healthcare by connecting providers, patients, and pharmacies through innovative technology that puts care first.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-base text-gray-600 dark:text-gray-400"
            >
              {["Founded by Healthcare Professionals", "Trusted by 10K+ Providers", "Serving 25+ Countries"].map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                  <HeartIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To empower healthcare providers with innovative technology that enhances patient care, 
                  streamlines operations, and creates meaningful connections across the entire healthcare ecosystem.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <LightBulbIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  A world where healthcare is seamlessly connected, intelligently managed, and accessible to all, 
                  where technology amplifies the human touch rather than replacing it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-about" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Making a difference in healthcare, one connection at a time
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={cardHover}
                className="text-center group"
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-emerald-50 group-hover:to-teal-50 dark:group-hover:from-emerald-900/20 dark:group-hover:to-teal-900/20">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100 mb-3">
                    {startCount && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Meet Our Leadership Team
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Experienced healthcare professionals and technology experts
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Journey
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Key milestones in our mission to transform healthcare
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">{milestone.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-white dark:border-gray-950 shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-black text-white mb-8"
            >
              Ready to Transform Healthcare Together?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Join our mission to revolutionize healthcare delivery and patient outcomes through innovative technology solutions.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl"
              >
                Join Our Team
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm"
              >
               <a href="/contact"> Contact Us</a>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/80 font-medium"
            >
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5" />
                <span>hello@caresync.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutPage;