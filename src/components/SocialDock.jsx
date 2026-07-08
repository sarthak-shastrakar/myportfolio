import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons';

const socials = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/sarthak-shastrakar',
    glowStart: 'rgba(80, 80, 80, 0.8)',
    glowEnd: 'rgba(200, 200, 200, 0.8)',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/sarthak-shastrakar',
    glowStart: 'rgba(10, 102, 194, 0.8)',
    glowEnd: 'rgba(85, 178, 255, 0.8)',
  },
  {
    name: 'Naukri',
    icon: FileText,
    url: 'https://www.naukri.com/',
    glowStart: 'rgba(3, 142, 159, 0.8)',
    glowEnd: 'rgba(45, 212, 191, 0.8)',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:sarthakshastrakar@gmail.com',
    glowStart: 'rgba(200, 60, 30, 0.8)',
    glowEnd: 'rgba(255, 138, 101, 0.8)',
  },
  {
    name: 'Phone',
    icon: Phone,
    url: 'tel:+919876543210',
    glowStart: 'rgba(2, 132, 199, 0.8)',
    glowEnd: 'rgba(56, 189, 248, 0.8)',
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
                className="social-bloom-btn mb-2"
                style={{
                  '--glow-start': social.glowStart,
                  '--glow-end': social.glowEnd,
                }}
              >
                <div className="bloom-container">
                  <div className="button-container-main">
                    <div className="button-inner">
                      <div className="back" />
                      <div className="front">
                        <Icon size={12} className="svg" />
                      </div>
                    </div>
                    <div className="button-glass">
                      <div className="back" />
                      <div className="front" />
                    </div>
                  </div>
                </div>
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
                className="social-bloom-btn mx-1"
                style={{
                  '--glow-start': social.glowStart,
                  '--glow-end': social.glowEnd,
                }}
              >
                <div className="bloom-container scale-[0.85]">
                  <div className="button-container-main">
                    <div className="button-inner">
                      <div className="back" />
                      <div className="front">
                        <Icon size={12} className="svg" />
                      </div>
                    </div>
                    <div className="button-glass">
                      <div className="back" />
                      <div className="front" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialDock;
