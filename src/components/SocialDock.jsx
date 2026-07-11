import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Phone } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/sarthak-shastrakar" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sarthak-shastrakar" },
  { icon: Mail, label: "Email", href: "mailto:sarthakshastrakar@gmail.com" },
  { icon: FileText, label: "Resume", href: "/resume.pdf" },
  { icon: Phone, label: "Phone", href: "tel:+918237937402" },
];

const SocialDock = () => {
  return (
    <>
      {/* ── Desktop: Floating Line Style ── */}
      <div className="hidden md:flex fixed z-40 flex-col items-center left-[28px] bottom-0">
        {/* The continuous line behind everything */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-px"
          initial={{ height: 0, top: 0 }}
          animate={{ height: '100%', top: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ 
            background: 'linear-gradient(to bottom, transparent, rgba(110,147,247,0.4) 20%, rgba(110,147,247,0.4) 80%, transparent)' 
          }}
        />
        
        {/* Icons rendered on top of the line */}
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a 
              key={i} 
              href={link.href}
              target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group relative z-10 flex items-center justify-center my-3 transition-all duration-300 rounded-full text-[rgba(169,192,255,0.6)] hover:text-[#a9c0ff]"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: 'rgba(10, 11, 20, 0.8)',
                border: '1px solid rgba(110, 147, 247, 0.2)',
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(110, 147, 247, 0.12)',
                borderColor: 'rgba(110, 147, 247, 0.7)',
                boxShadow: '0 0 12px rgba(110,147,247,0.35)'
              }}
            >
              {/* Glowing line segment on hover */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[72px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(110,147,247,0.9) 50%, transparent)' }}
              />

              <Icon size={16} />

              {/* Tooltip sliding in from left */}
              <div 
                className="absolute left-[calc(100%+12px)] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
                style={{ 
                  backgroundColor: 'rgba(110,147,247,0.15)', 
                  border: '1px solid rgba(110,147,247,0.3)', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '11px' 
                }}
              >
                {link.label}
              </div>
            </motion.a>
          );
        })}
        
        {/* Spacer for the vertical line to extend downwards */}
        <div className="h-[10vh] min-h-[60px]" />
      </div>

      {/* ── Mobile: Bottom-right corner pill ── */}
      <div className="md:hidden fixed bottom-5 right-5 z-40">
        <div className="flex gap-2 p-1.5 rounded-full backdrop-blur-md bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)]">
          {socialLinks.slice(0, 3).map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={link.label}
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full transition-all duration-200 ease-out text-[rgba(255,255,255,0.45)] hover:bg-[rgba(110,147,247,0.15)] hover:text-[#a9c0ff]"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialDock;
