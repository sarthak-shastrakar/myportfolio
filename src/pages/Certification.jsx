import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ExternalLink, Award } from 'lucide-react';
import DownloadButton from '../components/DownloadButton';

// Import images from root media directory
import certSimplilearn from '../../media/simplilearn_certificate.fb0111325bdb42e3a1ed.jpg';
import certGreatLearning from '../../media/certificate1.748952ca967827530075.jpg';
import certUdemy from '../../media/certificate2.6500ea4e9c71ab711ede.jpg';
import certInfosys from '../../media/infosys_certificate.5afdf4dcc435920a5060.jpg';
import resumePdf from '../../media/Sarthak_Fullstack_developer_new.32a16d90b49080b023f3.pdf';

const certificates = [
  {
    issuer: "SIMPLILEARN",
    title: "Introduction to Generative AI",
    color: "#6e93f7",
    image: certSimplilearn,
    glowColor: "rgba(110,147,247,0.3)"
  },
  {
    issuer: "SIMPLILEARN",
    title: "JavaScript for Beginners",
    color: "#8b5cf6",
    image: certGreatLearning,
    glowColor: "rgba(139,92,246,0.3)"
  },
  {
    issuer: "UDEMY",
    title: "Full Stack Web Development Bootcamp with MERN Stack Projects",
    color: "#34d399",
    image: certUdemy,
    glowColor: "rgba(52,211,153,0.3)"
  },
  {
    issuer: "INFOSYS",
    title: "Generative AI for All",
    color: "#fb923c",
    image: certInfosys,
    glowColor: "rgba(251,146,60,0.3)"
  },
];

/* ── Floating Particles Background Component ────────────────────────────── */
const ParticlesBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dots = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1.5, // 1.5 - 3.5px
        speed: Math.random() * 0.45 + 0.25, // 0.25 - 0.7px/frame
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.003,
        dir: Math.random() > 0.5 ? 1 : -1
      });
    }

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity})`;
        ctx.fill();

        if (!isReduced) {
          d.x += Math.cos(d.angle) * d.speed;
          d.y += Math.sin(d.angle) * d.speed;

          if (d.x < -10) d.x = w + 10;
          if (d.x > w + 10) d.x = -10;
          if (d.y < -10) d.y = h + 10;
          if (d.y > h + 10) d.y = -10;

          d.opacity += d.pulseSpeed * d.dir;
          if (d.opacity > 0.65) {
            d.opacity = 0.65;
            d.dir = -1;
          } else if (d.opacity < 0.1) {
            d.opacity = 0.1;
            d.dir = 1;
          }
        }
      });

      if (!isReduced) {
        animId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/* ── Main Certification Component ────────────────────────────────────────── */
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

  // Duplicate data to fill width for continuous marquee
  const loopList = [...certificates, ...certificates, ...certificates, ...certificates];

  return (
    <div className="flex flex-col w-full h-full relative pt-6 pb-24 text-left overflow-visible select-none">

      {/* Particles Background Layer */}
      <ParticlesBg />

      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start space-y-2"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#6e93f7] uppercase">
            Credentials & Achievements
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white relative">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] rounded-full" />
          <p className="text-gray-400 text-sm max-w-xl pt-1">
            Courses and certifications I've completed to sharpen my skills.
          </p>
        </motion.div>

        {/* Previous Folder/Pencil Download Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="shrink-0 self-start md:self-center"
        >
          <DownloadButton onClick={handleDownload} />
        </motion.div>
      </div>

      {/* ── Marquee row container ── */}
      <div className="flex flex-col w-full relative z-10 overflow-visible py-4">

        {/* ── ROW 1: Scrolling Left ── */}
        <div className="marquee-container relative w-full overflow-hidden py-3">
          {/* Masking overlay gradients for soft fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#06080f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#06080f] to-transparent z-10 pointer-events-none" />

          <div className="marquee-row-left gap-6 flex">
            {loopList.map((cert, idx) => (
              <div
                key={`row1-${idx}`}
                onClick={() => setSelectedCert(cert)}
                className="marquee-card group w-[320px] shrink-0 flex flex-col glass rounded-2xl overflow-hidden border border-white/5 cursor-pointer relative transition-all duration-350"
                style={{
                  '--glow': cert.glowColor,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 24px -6px rgba(0,0,0,0.6), 0 0 16px ${cert.glowColor}`;
                  e.currentTarget.style.borderColor = cert.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                {/* Image top */}
                <div className="w-full h-[200px] relative overflow-hidden bg-black/40">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* View label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full bg-[#6e93f7]/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
                      View Certificate
                    </span>
                  </div>
                </div>

                {/* Content bottom */}
                <div className="p-5 flex flex-col items-start gap-2 bg-[#06080f]/90 relative z-10 h-full flex-1">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: cert.color }}
                  >
                    {cert.issuer}
                  </span>
                  <h3 className="text-white font-semibold text-sm leading-snug text-left group-hover:text-[#6e93f7] transition-colors duration-250">
                    {cert.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── View Modal (Lightbox overlay) ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#06080f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white hover:bg-black/90 transition-colors duration-200 z-10 focus-visible:outline-none"
              >
                <X size={20} />
              </button>

              <div className="w-full aspect-[4/3] max-h-[70vh] bg-white flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#06080f] flex items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wider uppercase bg-white/5 border-white/10 text-white">
                    {selectedCert.issuer}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-snug">{selectedCert.title}</h4>
                </div>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-sm transition-all duration-200 shrink-0"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Marquee CSS Injections ── */}
      <style jsx="true">{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-row-left {
          display: flex;
          width: max-content;
          animation: marquee-left 35s linear infinite;
        }

        .marquee-row-right {
          display: flex;
          width: max-content;
          animation: marquee-right 45s linear infinite;
        }

        .marquee-container:hover .marquee-row-left,
        .marquee-container:hover .marquee-row-right {
          animation-play-state: paused;
        }

        .marquee-container:hover .marquee-card {
          opacity: 0.55;
        }

        .marquee-container:hover .marquee-card:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Certification;
