import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons';

const socials = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/sarthak-shastrakar',
    glowColor: 'rgba(255,255,255,0.35)',
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-white/40',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/sarthak-shastrakar',
    glowColor: 'rgba(110,147,247,0.5)',
    hoverText: 'hover:text-[#6e93f7]',
    hoverBorder: 'hover:border-[#6e93f7]/40',
  },
  {
    name: 'Naukri',
    icon: FileText,
    url: 'https://www.naukri.com/',
    glowColor: 'rgba(45,212,191,0.5)',
    hoverText: 'hover:text-[#2dd4bf]',
    hoverBorder: 'hover:border-[#2dd4bf]/40',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:sarthakshastrakar@gmail.com',
    glowColor: 'rgba(255,138,101,0.5)',
    hoverText: 'hover:text-[#ff8a65]',
    hoverBorder: 'hover:border-[#ff8a65]/40',
  },
  {
    name: 'Phone',
    icon: Phone,
    url: 'tel:+919876543210',
    glowColor: 'rgba(56,189,248,0.5)',
    hoverText: 'hover:text-[#38bdf8]',
    hoverBorder: 'hover:border-[#38bdf8]/40',
  },
];

const SocialDock = () => {
  return (
    <>
      {/* ── Desktop: Fixed left, padded so it never overlaps content ── */}
      <div
        className="hidden md:flex flex-col items-center gap-3 fixed z-40"
        style={{ left: '16px', bottom: '32px' }}
      >
        <div className="flex flex-col gap-2.5">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Sarthak's ${social.name}`}
                title={social.name}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.15, x: 2 }}
                whileTap={{ scale: 0.92 }}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  border border-white/10 text-gray-500
                  bg-[#0b1020]/60 backdrop-blur-sm
                  transition-colors duration-300 focus-visible:outline-none
                  ${social.hoverText} ${social.hoverBorder}
                `}
                style={{
                  '--glow': social.glowColor,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 12px ${social.glowColor}, 0 0 24px ${social.glowColor.replace('0.5', '0.18')}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>

        {/* Vertical line below icons */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#8b5cf6]/50 to-transparent rounded-full" />
      </div>

      {/* ── Mobile: Bottom-right corner pill ── */}
      <div className="md:hidden fixed bottom-5 right-5 z-40">
        <div className="flex gap-2 glass p-1.5 rounded-full border border-white/10 shadow-2xl">
          {socials.slice(0, 3).map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/5 text-gray-300 bg-white/5 transition-all duration-200 hover:scale-110"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialDock;
