import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  StarIcon,
  PlayIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  HeartIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  LockClosedIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import StatsSection from "./StatsSection";
import Pricing from "./PriceSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                CareSync
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 mt-4 px-3">
                <Link
                  to="/login"
                  className="text-center py-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg text-center font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-teal-50 overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                🚀 Now in Beta - Join Early Access
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                Healthcare
                <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"> Simplified</span>
                <br />
                for Everyone
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                CareSync connects patients, doctors, and pharmacists in one
                secure platform. Manage prescriptions, track health, and
                collaborate seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl 
                  flex items-center justify-center space-x-2 font-bold text-lg shadow-xl hover:shadow-2xl 
                  transition-all duration-300 transform hover:scale-105"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl 
                  hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 
                  flex items-center justify-center space-x-2 font-bold text-lg 
                  transition-all duration-300 transform hover:scale-105"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Enhanced Features with Typewriter */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 text-base text-gray-600">
                {[
                  "Free 30-day trial",
                  "No credit card required"
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">
                      <Typewriter
                        words={[text]}
                        loop={1}
                        cursor
                        typeSpeed={50}
                        delaySpeed={index * 1000}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <ChartBarIcon className="h-6 w-6 mr-2" />
                    Live Dashboard
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Active Patients", value: "1,247" },
                      { label: "Prescriptions Today", value: "89" },
                      { label: "Response Time", value: "2min" }
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-white/30 backdrop-blur-sm rounded-xl p-4"
                      >
                        <span className="font-medium">{stat.label}</span>
                        <span className="font-bold text-xl">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-green-100 text-green-600 p-4 rounded-2xl shadow-lg animate-bounce">
                <HeartIcon className="h-8 w-8" />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-blue-100 text-blue-600 p-4 rounded-2xl shadow-lg animate-pulse">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Everything You Need for 
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"> Modern Healthcare</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Our comprehensive platform brings together all stakeholders in the
              healthcare ecosystem with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HeartIcon,
                title: "Patient Portal",
                description: "Secure access to medical records, prescription tracking, and health monitoring tools.",
                features: ["Smart Medicine Reminders", "Health Analytics", "Prescription History", "Doctor Communication"],
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: UsersIcon,
                title: "Doctor Dashboard",
                description: "Comprehensive patient management with AI-powered diagnosis assistance.",
                features: ["Patient Management", "AI Diagnosis Support", "Digital Prescriptions", "Analytics Dashboard"],
                gradient: "from-teal-500 to-blue-500"
              },
              {
                icon: ShieldCheckIcon,
                title: "Pharmacy Integration",
                description: "Streamlined prescription processing and inventory management.",
                features: ["Order Processing", "Inventory Tracking", "Delivery Management", "Alternative Suggestions"],
                gradient: "from-purple-500 to-indigo-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 from-teal-500 to-blue-500" />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700 font-medium"
                      >
                        <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Ready to Transform Your 
            <br className="hidden sm:block" />
            Healthcare Experience?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Join thousands of healthcare professionals who trust CareSync for better patient care and streamlined operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              to="/register"
              className="bg-white text-teal-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Your Free Trial
            </Link>
            
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-teal-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/80 font-medium">
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              30-day free trial
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              No credit card required
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">CareSync Demo</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PlayIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Demo video will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
