import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, GraduationCap, MapPin, Code2, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/icons';
import Astronaut from '../components/Astronaut';

const About = () => {
  const contacts = [
    { name: 'Email', icon: Mail, url: 'mailto:sarthakshastrakar@gmail.com', value: 'sarthakshastrakar@gmail.com', external: false },
    { name: 'GitHub', icon: Github, url: 'https://github.com/sarthak-shastrakar', value: 'github.com/sarthak-shastrakar', external: true },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/sarthak-shastrakar', value: 'linkedin.com/in/sarthak-shastrakar', external: true },
    { name: 'Naukri', icon: FileText, url: 'https://www.naukri.com/', value: 'Naukri Profile', external: true },
  ];

  return (
    <div className="flex flex-col gap-12 w-full mt-6">

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start text-left space-y-2"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          About <span className="bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="w-20 h-1 bg-[#6e93f7] rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* LEFT COLUMN: Mascot & Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-center gap-6 glass p-8 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff8a65]/10 to-transparent blur-xl pointer-events-none" />

          {/* Astronaut floating */}
          <div className="w-full max-w-[200px] flex items-center justify-center animate-float-slow">
            <Astronaut pose="waving" className="w-full h-full" />
          </div>

          <div className="text-center">
            <h3 className="font-serif text-xl font-bold text-white">Sarthak Shastrakar</h3>
            <p className="text-sm text-gray-400 font-mono mt-1.5 flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2dd4bf]" />
              </span>
              Open to Work
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full border-t border-white/5 pt-6 text-sm text-left font-sans">
            <div className="flex items-start gap-3 text-gray-300">
              <GraduationCap size={16} className="text-[#6e93f7] mt-0.5 flex-shrink-0" />
              <span>B.Tech Computer Engineering (2022–2026)</span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <MapPin size={16} className="text-[#ff8a65] mt-0.5 flex-shrink-0" />
              <span>Nagpur, Maharashtra, India</span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <Code2 size={16} className="text-[#2dd4bf] mt-0.5 flex-shrink-0" />
              <span>MERN Stack Developer</span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <Phone size={16} className="text-[#38bdf8] mt-0.5 flex-shrink-0" />
              <span>+91 87679 01968</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Bio & Contact */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Main Bio Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass p-8 rounded-3xl border border-white/5 text-left space-y-6"
          >
            {/* <h3 className="font-serif text-2xl font-bold text-white">About Me</h3> */}

            <div className="text-gray-300 leading-relaxed font-sans space-y-4">
              <p>
                Hi, I'm Sarthak Shastrakar — a B.Tech Computer Engineering student from Nagpur (2022–2026), currently interning as a Backend Developer at Appveda Software.
              </p>

              <p>
                I build full-stack web apps using the MERN stack. Over the last couple of years, I've shipped projects like a real-time video conferencing app, an AI-powered career coaching platform built with Gemini API, and a personal AI chatbot — all built from scratch.
              </p>

              <p>
                At Appveda, I work primarily on Node.js backends — building APIs, handling server-side logic.
              </p>

              <p>
                I like writing code that's clean, building things that actually work, and learning whatever the next project needs me to learn.
              </p>
            </div>
          </motion.div>

          {/* Contact & Socials Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass p-8 rounded-3xl border border-white/5 text-left space-y-6"
          >
            <h3 className="font-serif text-xl font-bold text-white">Contact & Socials</h3>

            <div className="flex flex-wrap gap-3">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={index}
                    href={contact.url}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/5 bg-white/5 text-gray-300 text-sm font-semibold transition-all duration-300 hover:border-[#6e93f7]/50 hover:shadow-[0_0_12px_rgba(110,147,247,0.2)] hover:text-white focus-visible:outline-none"
                  >
                    <Icon size={16} />
                    <span>{contact.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default About;
