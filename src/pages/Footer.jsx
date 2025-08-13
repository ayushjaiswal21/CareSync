import { HeartIcon } from "@heroicons/react/24/solid";
import {
  FaceSmileIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();
  const linkSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "API Documentation", "Integrations", "Security"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Community", "Webinars", "Status"],
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer id="contact" className="bg-subtle w-full z-50">
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed h-10 w-10 text-xl z-1000 bottom-8 right-8 gradient-accent p-2 rounded-lg font-bold cursor-pointer hover:gradient-accent-alt hover:scale-110 transition-all duration-200"
        >
          <ChevronDoubleUpIcon />
        </button>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Social */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-default">CareSync</span>
            </div>

            <p className="text-muted text-sm leading-relaxed">
              Revolutionizing healthcare through seamless collaboration between patients, doctors, and pharmacists.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Social 1"
                className="w-10 h-10 bg-surface-subtle rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors"
              >
                <FaceSmileIcon className="h-5 w-5 text-default" />
              </a>
              <a
                href="#"
                aria-label="Social 2"
                className="w-10 h-10 bg-surface-subtle rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors"
              >
                <BookOpenIcon className="h-5 w-5 text-default" />
              </a>
              <a
                href="#"
                aria-label="Social 3"
                className="w-10 h-10 bg-surface-subtle rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5 text-default" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-default">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted hover:text-default transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Query Section */}
        <div className="mt-12 flex justify-center">
          <div className="mx-auto md:mx-0 md:max-w-3xl w-full bg-surface/70 rounded-2xl p-6 shadow-xl border border-subtle backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2 text-default">Have any questions? 📩</h3>
            <p className="text-muted text-sm mb-4">
              Subscribe to our newsletter or drop your query below. We'll get back to you soon!
            </p>

            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-base flex-1"
              />
              <button
                type="submit"
                className="btn-accent-gradient"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-4">
              <textarea
                placeholder="Write your message..."
                rows={2}
                className="input-base"
              />
              <button
                type="button"
                className="mt-3 w-full btn-accent-gradient"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-subtle pt-6 text-xs text-muted flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} CareSync. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-default transition-colors">Privacy</a>
            <a href="#" className="hover:text-default transition-colors">Terms</a>
            <a href="#" className="hover:text-default transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
