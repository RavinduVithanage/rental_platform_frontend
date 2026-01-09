import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, SparklesIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Our Location",
      details: ["123 Main Street", "Colombo, Sri Lanka", "00100"],
      gradient: "from-violet-600 to-purple-600"
    },
    {
      icon: PhoneIcon,
      title: "Phone Number",
      details: ["+94 11 234 5678", "+94 77 123 4567", "Mon-Fri: 9AM - 6PM"],
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Address",
      details: ["info@fasorent.com", "support@fasorent.com", "We reply within 24hrs"],
      gradient: "from-pink-600 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Contact Us</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Have a question or need assistance? We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#16162a]/80 backdrop-blur-xl rounded-2xl p-8 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-400">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#16162a]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-violet-500/10">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Send Us a Message
            </h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center"
              >
                <p className="text-emerald-400 font-semibold">✓ Message sent successfully! We'll get back to you soon.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3.5 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="bg-[#16162a]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-violet-500/10">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63257747158!2d79.77380209999999!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;