import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaLock, FaMobileAlt, FaCloud } from "react-icons/fa";
import SplashCursor from "../components/SplashCursor";

const features = [
  {
    icon: <FaHeartbeat size={28} />,
    title: "Smart Health Monitoring",
    description:
      "Real-time health tracking with personalized alerts and analytics for both patients and caregivers.",
  },
  {
    icon: <FaLock size={28} />,
    title: "Secure Data Protection",
    description:
      "HIPAA-compliant encryption ensures your medical records and health data stay private and secure.",
  },
  {
    icon: <FaMobileAlt size={28} />,
    title: "Mobile-first Experience",
    description:
      "Access CareSync anytime, anywhere from your smartphone, tablet, or desktop without missing a beat.",
  },
  {
    icon: <FaCloud size={28} />,
    title: "Cloud-Based Sync",
    description:
      "Keep all your health data in sync across devices with our reliable and scalable cloud platform.",
  },
];

const Feature = () => {
  return (
    <section
      id="features"
      className="min-h-screen py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100"
    >
        <SplashCursor/>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 text-emerald-600">
          Why Choose CareSync?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore the features that make CareSync the go-to platform for smart,
          secure, and accessible healthcare management.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
