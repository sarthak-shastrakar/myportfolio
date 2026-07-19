import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award } from 'lucide-react';
import DownloadButton from '../components/DownloadButton';

import certSimplilearn from '../../media/simplilearn_certificate.fb0111325bdb42e3a1ed.jpg';
import certGreatLearning from '../../media/certificate1.748952ca967827530075.jpg';
import certUdemy from '../../media/certificate2.6500ea4e9c71ab711ede.jpg';
import certInfosys from '../../media/infosys_certificate.5afdf4dcc435920a5060.jpg';
import resumePdf from '../../media/Sarthak_Fullstack_developer_new.32a16d90b49080b023f3.pdf';

/* ── Certificate data ─────────────────────────────────────────────────────── */
const certificates = [
  {
    issuer: 'SIMPLILEARN',
    title: 'Introduction to Generative AI',
    color: '#6e93f7',
    image: certSimplilearn,
    glowColor: 'rgba(110,147,247,0.35)',
    year: '2024',
  },
  {
    issuer: 'SIMPLILEARN',
    title: 'JavaScript for Beginners',
    color: '#8b5cf6',
    image: certGreatLearning,
    glowColor: 'rgba(139,92,246,0.35)',
    year: '2023',
  },
  {
    issuer: 'UDEMY',
    title: 'Full Stack Web Development Bootcamp with MERN Stack Projects',
    color: '#34d399',
    image: certUdemy,
    glowColor: 'rgba(52,211,153,0.35)',
    year: '2023',
  },
  {
    issuer: 'INFOSYS',
    title: 'Generative AI for All',
    color: '#fb923c',
    image: certInfosys,
    glowColor: 'rgba(251,146,60,0.35)',
    year: '2024',
  },
];

/* ── Individual Certificate Card ──────────────────────────────────────────── */
const CertCard = ({ cert, onClick, dimmed }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(cert)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="marquee-card group w-[300px] shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-pointer relative"
      style={{
        background: 'rgba(11,16,32,0.6)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? cert.color + '50' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? `0 0 30px ${cert.glowColor}, 0 16px 48px rgba(0,0,0,0.5)`
          : '0 8px 24px rgba(0,0,0,0.3)',
        transform: hovered
          ? 'scale(1.06) translateY(-6px)'
          : dimmed ? 'scale(0.96) translateY(3px)' : 'scale(1) translateY(0)',
        opacity: dimmed ? 0.55 : 1,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Certificate image */}
      <div className="w-full h-[190px] relative overflow-hidden bg-[#0a0b14]/40 flex-shrink-0">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? 'rgba(10,11,20,0.45)'
              : 'rgba(10,11,20,0.1)',
            transition: 'background 0.3s',
          }}
        />

        {/* "View" label on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          <span
            className="px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider text-white shadow-lg"
            style={{ background: cert.color + 'cc', boxShadow: `0 0 20px ${cert.glowColor}` }}
          >
            View Certificate
          </span>
        </div>

        {/* Year badge */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono font-bold"
          style={{
            background: `${cert.color}20`,
            border: `1px solid ${cert.color}40`,
            color: cert.color,
          }}
        >
          {cert.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <Award size={12} style={{ color: cert.color }} />
          <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: cert.color }}>
            {cert.issuer}
          </span>
        </div>
        <h3
          className="text-white font-semibold text-[13px] leading-snug"
          style={{ color: hovered ? '#fff' : 'rgba(226,232,240,0.9)' }}
        >
          {cert.title}
        </h3>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 w-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
          width: hovered ? '100%' : '0%',
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  );
};

/* ── Marquee Row ──────────────────────────────────────────────────────────── */
const MarqueeRow = ({ certs, direction, speed, selectedCert, setSelectedCert }) => {
  const loopList = [...certs, ...certs, ...certs, ...certs];
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className="marquee-container relative w-full overflow-hidden py-3"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
    >
      <div
        className="flex"
        style={{
          width: 'max-content',
          animation: `${animName} ${speed}s linear infinite`,
          gap: '1.5rem',
        }}
      >
        {loopList.map((cert, idx) => (
          <CertCard
            key={`${direction}-${idx}`}
            cert={cert}
            onClick={(c) => setSelectedCert(c)}
            dimmed={selectedCert !== null && selectedCert !== cert}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Certificate Modal ────────────────────────────────────────────────────── */
const CertModal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(5,7,18,0.92)', backdropFilter: 'blur(20px)' }}
  >
    <motion.div
      initial={{ scale: 0.88, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.88, y: 20, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 300 }}
      onClick={e => e.stopPropagation()}
      className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
      style={{
        background: '#0a0b14',
        border: `1px solid ${cert.color}30`,
        boxShadow: `0 0 60px ${cert.glowColor}, 0 32px 80px rgba(0,0,0,0.7)`,
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        style={{ background: 'rgba(11,16,32,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <X size={18} />
      </button>

      {/* Image */}
      <div className="w-full bg-white flex items-center justify-center" style={{ maxHeight: '68vh', overflow: 'hidden' }}>
        <img
          src={cert.image}
          alt={cert.title}
          className="max-w-full max-h-full object-contain"
          style={{ maxHeight: '68vh' }}
        />
      </div>

      {/* Footer */}
      <div
        className="p-6 flex items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${cert.color}18` }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award size={13} style={{ color: cert.color }} />
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: cert.color }}
            >
              {cert.issuer}
            </span>
          </div>
          <h4 className="text-lg font-bold text-white">{cert.title}</h4>
        </div>
        <a
          href={cert.image}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all shrink-0"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ExternalLink size={14} />
          <span>Full Resolution</span>
        </a>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Main Certification Component ─────────────────────────────────────────── */
const Certification = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.setAttribute('download', 'Sarthak_Shastrakar_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col w-full h-full relative pt-6 pb-24 text-left overflow-visible select-none">

      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start space-y-2"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#6e93f7] uppercase">
            Credentials & Achievements
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Certifi
            <span
              className="animate-gradient-text bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #6e93f7, #a78bfa, #8b5cf6)', backgroundSize: '200% 200%' }}
            >
              cations
            </span>
          </h2>
          <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }} />
          <p className="text-gray-400 text-sm max-w-xl pt-1">
            Courses and certifications I've completed — click any card to view.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="shrink-0 self-start md:self-center"
        >
          <DownloadButton onClick={handleDownload} />
        </motion.div>
      </div>

      {/* ── Dual Marquee rows ── */}
      <div className="flex flex-col gap-6 w-full relative z-10">
        {/* Row 1: scroll left */}
        <MarqueeRow
          certs={certificates}
          direction="left"
          speed={32}
          selectedCert={selectedCert}
          setSelectedCert={setSelectedCert}
        />
      </div>

      {/* ── Certificate count badge ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mt-8 z-10"
      >
        <Award size={13} className="text-[#6e93f7]" />
        <span className="text-[11px] font-mono text-gray-500">
          {certificates.length} verified certifications
        </span>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>

      {/* ── Marquee CSS ── */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Certification;
