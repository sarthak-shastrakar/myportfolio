import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, GraduationCap, MapPin, Code2, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/icons';
import Astronaut from '../components/Astronaut';
import { useCountUp } from '../hooks/useCountUp';

/* ── Animated stat chip ───────────────────────────────────────────────────── */
const StatChip = ({ target, suffix, label, color, glowColor }) => {
  const [ref, count] = useCountUp(target, 1200);
  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border text-center"
      style={{
        background: 'rgba(11,16,32,0.5)',
        borderColor: `${color}22`,
        boxShadow: `0 0 20px ${glowColor}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="font-serif text-2xl font-extrabold"
        style={{ color }}
      >
        {count}{suffix}
      </span>
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
};

/* ── Main About Component ─────────────────────────────────────────────────── */
const About = () => {
  const contacts = [
    { name: 'Email', icon: Mail, url: 'mailto:sarthakshastrakar9@gmail.com', value: 'sarthakshastrakar9@gmail.com', external: false },
    { name: 'GitHub', icon: Github, url: 'https://github.com/sarthak-shastrakar', value: 'github.com/sarthak-shastrakar', external: true },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/sarthak-shastrakar', value: 'linkedin.com/in/sarthak-shastrakar', external: true },
    { name: 'Naukri', icon: FileText, url: 'https://www.naukri.com/mnjuser/profile?id=&altresid', value: 'Naukri Profile', external: true },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

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
          About{' '}
          <span
            className="animate-gradient-text bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #6e93f7, #a78bfa, #8b5cf6)',
              backgroundSize: '200% 200%',
            }}
          >
            Me
          </span>
        </h2>
        <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* ── LEFT: Mascot & Details ── */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-center gap-6 glass-premium p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Corner glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6e93f7]/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8b5cf6]/8 to-transparent blur-xl pointer-events-none" />

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
            {[
              { icon: GraduationCap, color: '#6e93f7', text: 'B.Tech Computer Engineering (2022–2026)' },
              { icon: MapPin, color: '#ff8a65', text: 'Nagpur, Maharashtra, India' },
              { icon: Code2, color: '#2dd4bf', text: 'MERN Stack Developer' },
              { icon: Phone, color: '#38bdf8', text: '+91 87679 01968' },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-start gap-3 text-gray-300">
                <Icon size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-2 w-full pt-2">
            <StatChip target={2} suffix="+" label="Years" color="#6e93f7" glowColor="rgba(110,147,247,0.08)" />
            <StatChip target={10} suffix="+" label="Projects" color="#a78bfa" glowColor="rgba(167,139,250,0.08)" />
            <StatChip target={5} suffix="+" label="Tech" color="#2dd4bf" glowColor="rgba(45,212,191,0.08)" />
          </div>
        </motion.div>

        {/* ── RIGHT: Bio & Contact ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Bio Panel */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-premium p-8 rounded-3xl text-left space-y-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#6e93f7]/6 to-transparent blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6e93f7]/20 to-[#8b5cf6]/20 border border-[#6e93f7]/20 flex items-center justify-center">
                <Code2 size={14} className="text-[#6e93f7]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Who I Am</h3>
            </div>

            <div className="text-gray-300 leading-relaxed font-sans space-y-4 text-[15px]">
              <p>
                Hi, I'm <span className="text-white font-semibold">Sarthak Shastrakar</span> — a B.Tech Computer Engineering student from Nagpur (2022–2026), currently interning as a Backend Developer at Appveda Software.
              </p>
              <p>
                I build full-stack web apps using the <span className="text-[#6e93f7] font-semibold">MERN stack</span>. Over the last couple of years, I've shipped projects like a real-time video conferencing app, an AI-powered career coaching platform built with Gemini API, and a personal AI chatbot — all built from scratch.
              </p>
              <p>
                At Appveda, I work primarily on <span className="text-[#a78bfa] font-semibold">Node.js backends</span> — building APIs, handling server-side logic, and managing deployments on VPS servers.
              </p>
              <p>
                I like writing code that's clean, building things that actually work, and learning whatever the next project needs me to learn.
              </p>
            </div>
          </motion.div>

          {/* Contact Panel */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-premium p-8 rounded-3xl text-left space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff8a65]/20 to-[#8b5cf6]/20 border border-[#ff8a65]/20 flex items-center justify-center">
                <Mail size={14} className="text-[#ff8a65]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Contact & Socials</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={index}
                    href={contact.url}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noreferrer' : undefined}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-300 focus-visible:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.07)',
                      color: 'rgba(209,213,219,1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(110,147,247,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(110,147,247,0.15)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.color = 'rgba(209,213,219,1)';
                    }}
                  >
                    <Icon size={15} />
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
