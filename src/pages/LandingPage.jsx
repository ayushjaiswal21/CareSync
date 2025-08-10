import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  LockClosedIcon
} from '@heroicons/react/24/outline'

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">CareSync</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 via-white to-medical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div data-aos="fade-right" className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  🚀 Now in Beta - Join Early Access
                </div>
                <h1 data-aos="fade-right" className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Healthcare
                  <span className="text-primary-600"> Simplified</span>
                  <br />for Everyone
                </h1>
                <p data-aos="fade-right" className="text-xl text-gray-600 leading-relaxed">
                  CareSync connects patients, doctors, and pharmacists in one secure platform. 
                  Manage prescriptions, track health, and collaborate seamlessly.
                </p>
              </div>
              
              <div data-aos="fade-right" className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div data-aos="slide-up" className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-up" className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-primary-500 to-medical-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Live Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                      <span>Active Patients</span>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                      <span>Prescriptions Today</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
                      <span>Response Time</span>
                      <span className="font-bold">2min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-green-100 text-green-600 p-3 rounded-full animate-bounce">
                <HeartIcon className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-100 text-blue-600 p-3 rounded-full animate-pulse">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Healthcare Providers', value: '10,000+', icon: UsersIcon },
              { label: 'Patients Served', value: '500K+', icon: HeartIcon },
              { label: 'Prescriptions Processed', value: '2M+', icon: ClockIcon },
              { label: 'Uptime Guarantee', value: '99.9%', icon: ShieldCheckIcon },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary-400" />
                </div>
                <div data-aos="fade-up" data-aos-duration="800" className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div data-aos="fade-up" data-aos-duration="1000" className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Healthcare
            </h2>
            <p data-aos="fade-up" data-aos-duration="900" className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform brings together all stakeholders in the healthcare ecosystem
            </p>
          </div>
          
          <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HeartIcon,
                title: 'Patient Portal',
                description: 'Secure access to medical records, prescription tracking, and health monitoring tools.',
                features: ['Medicine Reminders', 'Health Logs', 'Prescription History', 'Doctor Communication']
              },
              {
                icon: UsersIcon,
                title: 'Doctor Dashboard',
                description: 'Comprehensive patient management with AI-powered diagnosis assistance.',
                features: ['Patient Management', 'AI Diagnosis Support', 'Digital Prescriptions', 'Analytics Dashboard']
              },
              {
                icon: ShieldCheckIcon,
                title: 'Pharmacy Integration',
                description: 'Streamlined prescription processing and inventory management.',
                features: ['Order Processing', 'Inventory Tracking', 'Delivery Management', 'Alternative Suggestions']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div data-aos="fade-up" className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 data-aos="fade-up" className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p data-aos="flip-left" className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li data-aos="fade-right" key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p data-aos="fade-up" data-aos-duration="900" className="text-xl text-gray-600">
              Choose the plan that's right for your healthcare needs
            </p>
          </div>
          
          <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$29',
                period: '/month',
                description: 'Perfect for small clinics',
                features: [
                  'Up to 100 patients',
                  'Basic dashboard',
                  'Prescription management',
                  'Email support',
                  'Mobile app access'
                ],
                cta: 'Start Free Trial',
                popular: false
              },
              {
                name: 'Professional',
                price: '$99',
                period: '/month',
                description: 'Best for growing practices',
                features: [
                  'Up to 1,000 patients',
                  'Advanced analytics',
                  'AI-powered insights',
                  'Priority support',
                  'API integrations',
                  'Custom branding'
                ],
                cta: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                description: 'For large healthcare systems',
                features: [
                  'Unlimited patients',
                  'Custom integrations',
                  'Dedicated support',
                  'Advanced security',
                  'Custom workflows',
                  'SLA guarantee'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 relative ${plan.popular ? 'ring-2 ring-primary-600 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div data-aos="flip-right" className="text-center mb-8">
                  <h3 data-aos="flip-right" className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div data-aos="flip-right" className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p data-aos="flip-right" className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul data-aos="flip-right" className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li data-aos="flip-right" key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button data-aos="flip-right" className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p data-aos="fade-up" data-aos-duration="900" className="text-xl text-gray-600">
              See what our users are saying about CareSync
            </p>
          </div>
          
          <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Cardiologist',
                hospital: 'Metro General Hospital',
                content: 'CareSync has revolutionized how I manage my patients. The AI-powered insights help me make better diagnoses, and the seamless communication with pharmacists ensures my patients get the right medications quickly.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Pharmacist',
                hospital: 'HealthPlus Pharmacy',
                content: 'The prescription management system is incredibly efficient. We\'ve reduced processing time by 60% and eliminated prescription errors. The integration with doctors\' systems is flawless.',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                role: 'Patient',
                hospital: 'User since 2024',
                content: 'As someone with chronic conditions, CareSync has been a lifesaver. I never miss medications thanks to smart reminders, and I can easily track my health progress and communicate with my care team.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div data-aos="fade-up" className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p data-aos="flip-right" className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div data-aos="flip-right" className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div data-aos="flip-right" className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.hospital}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 data-aos="fade-up" className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p data-aos="fade-up" className="text-xl text-primary-100 mb-8">
            Join thousands of healthcare professionals who trust CareSync for better patient care
          </p>
          <div data-aos="fade-up" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Your Free Trial
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
          <p data-aos="fade-up" className="text-primary-200 text-sm mt-4">
            30-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div data-aos="fade-up" className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">CareSync</span>
              </div>
              <p data-aos="fade-up" className="text-gray-400 mb-4">
                Revolutionizing healthcare through seamless collaboration between patients, doctors, and pharmacists.
              </p>
              <div data-aos="fade-up" className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
                  <span className="text-sm">📘</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
                  <span className="text-sm">💼</span>
                </div>
              </div>
            </div>
            
            {[
              {
                title: 'Product',
                links: [{text:'Features',link:'#features'}, {text:'Pricing',link:'#pricing'}, {text:'API Documentation',link:'#api-docs'}, {text:'Integrations',link:'#integrations'}, {text:'Security',link:'#security'}]
              },
              {
                title: 'Company',
                links: [{text:'About Us',link:'#about'}, {text:'Careers',link:'#careers'}, {text:'Press',link:'#press'}, {text:'Partners',link:'#partners'}, {text:'Contact',link:'#contact'}]
              },
              {
                title: 'Resources',
                links: [{text:'Blog',link:'#blog'}, {text:'Help Center',link:'#help-center'}, {text:'Community',link:'#community'}, {text:'Webinars',link:'#webinars'}, {text:'Status',link:'#status'}]
              }
            ].map((section, index) => (
              <div data-aos="fade-up" key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.link} className="text-gray-400 hover:text-white transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 CareSync. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 lg:mt-0">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
