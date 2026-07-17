import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X, Code2 } from 'lucide-react';
import { GithubIcon as Github } from '../components/icons';

/* ── Projects Data ────────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'CareerForge AI',
    description: 'AI-powered career coaching platform for ATS-optimized resumes, mock interviews, and cover letters — built with Gemini AI and Openrouter API.',
    tags: ['React.js', 'Node.js', 'Gemini AI', 'TailwindCSS', 'Openrouter API'],
    liveUrl: 'https://careerforge2.vercel.app/',
    githubUrl: 'https://github.com/sarthak-shastrakar/nextstepai',
    accentColor: '#6e93f7',
    gradient: 'from-[#6e93f7]/20 via-[#8b5cf6]/10 to-transparent',
  },
  {
    title: 'Video Conferencing App',
    description: 'A real-time video conferencing application built using the MERN (MongoDB, Express, React, Node.js) technology stack.',
    tags: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://conectify-frontend.onrender.com',
    githubUrl: 'https://github.com/sarthak-shastrakar/conectify',
    accentColor: '#2dd4bf',
    gradient: 'from-[#2dd4bf]/20 via-[#0d9488]/10 to-transparent',
  },
  {
    title: 'Personal Portfolio',
    description: 'A personal portfolio website built using ReactJS, Framer-Motion and Animation. Responsive with a clean and modern design.',
    tags: ['React.js', 'AOS', 'CSS'],
    liveUrl: 'https://myportfolio-6sz6.onrender.com',
    githubUrl: 'https://github.com/sarthak-shastrakar/myportfolio',
    accentColor: '#a78bfa',
    gradient: 'from-[#a78bfa]/20 via-[#8b5cf6]/10 to-transparent',
  },
  {
    title: 'Personal AI Chatbot',
    description: 'A simple yet fun AI chatbot built with HTML, CSS, and JavaScript. Try asking it questions!',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://sarthak-shastrakar.github.io/chatbot-AI/',
    githubUrl: 'https://github.com/sarthak-shastrakar/chatbot-AI',
    accentColor: '#fb923c',
    gradient: 'from-[#fb923c]/20 via-[#f59e0b]/10 to-transparent',
  },
  {
    title: 'AI Assistant',
    description: 'A browser-based AI Assistant created using HTML, CSS, and JavaScript. Provides a clean chatbot interface that responds to user input in real-time.',
    tags: ['HTML', 'CSS3', 'JavaScript'],
    liveUrl: 'https://sarthak-shastrakar.github.io/AI-assistant/',
    githubUrl: 'https://github.com/sarthak-shastrakar/AI-assistant',
    accentColor: '#34d399',
    gradient: 'from-[#34d399]/20 via-[#059669]/10 to-transparent',
  },
  {
    title: 'StayCation — Travel Site',
    description: 'A full-stack Airbnb-style travel website with property listings, Cloudinary image uploads, and booking system.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Cloudinary'],
    liveUrl: 'https://travelling-site-airbnb.onrender.com',
    githubUrl: 'https://github.com/sarthak-shastrakar/Travelling-site-Airbnb',
    accentColor: '#f472b6',
    gradient: 'from-[#f472b6]/20 via-[#ec4899]/10 to-transparent',
  },
  {
    title: 'MARKETMITRA E-Commerce',
    description: 'A responsive local store e-commerce platform with product filtering, cart functionality, and Cloudinary image uploads.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Cloudinary'],
    liveUrl: 'https://e-commerce-maket-mitra.onrender.com',
    githubUrl: 'https://github.com/sarthak-shastrakar/E-Commerce-Maket_Mitra',
    accentColor: '#fbbf24',
    gradient: 'from-[#fbbf24]/20 via-[#f59e0b]/10 to-transparent',
  },
  {
    title: 'Skin Disease Detection',
    description: 'A ML-based web app that detects skin diseases from images using a trained CNN model and provides diagnostic details.',
    tags: ['Streamlit', 'Python', 'TensorFlow', 'Keras', 'CNN'],
    liveUrl: 'https://skin-diagnose-detection-project-001.streamlit.app/',
    githubUrl: 'https://github.com/sarthak-shastrakar/skin-diagnose-detection-project',
    accentColor: '#c084fc',
    gradient: 'from-[#c084fc]/20 via-[#a855f7]/10 to-transparent',
  },
  {
    title: 'Todo App [React]',
    description: 'A todo app built using React.js technology with a clean and minimal UI.',
    tags: ['React.js', 'JavaScript'],
    liveUrl: 'https://sarthak-shastrakar.github.io/Todo-App/',
    githubUrl: 'https://github.com/sarthak-shastrakar/Todo-App',
    accentColor: '#38bdf8',
    gradient: 'from-[#38bdf8]/20 via-[#0ea5e9]/10 to-transparent',
  },
  {
    title: 'API Jokes Maker',
    description: 'A Jokes Maker App built using React.js that fetches jokes from an external API.',
    tags: ['React.js', 'API'],
    liveUrl: 'https://sarthak-shastrakar.github.io/Jokes_Maker/',
    githubUrl: 'https://github.com/sarthak-shastrakar/Jokes_Maker',
    accentColor: '#4ade80',
    gradient: 'from-[#4ade80]/20 via-[#22c55e]/10 to-transparent',
  },
];

/* ── Magnetic Button ──────────────────────────────────────────────────────── */
const MagneticButton = ({ children, className, style, onClick, href, target, rel }) => {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `translate(${dx * 6}px, ${dy * 6}px) scale(1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0,0) scale(1)';
    }
  }, []);

  const props = {
    ref: btnRef,
    className: `magnetic-btn ${className}`,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return <a href={href} target={target} rel={rel} {...props}>{children}</a>;
  }
  return <button onClick={onClick} {...props}>{children}</button>;
};

/* ── Project Modal ────────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const { accentColor } = project;

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,7,18,0.88)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 24, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(11,16,32,0.95)',
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 0 60px ${accentColor}20, 0 24px 80px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Gradient preview header */}
        <div
          className="w-full h-48 relative flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accentColor}25 0%, rgba(11,16,32,0.9) 60%, rgba(11,16,32,1) 100%)`,
          }}
        >
          {/* Decorative code-like lines */}
          <div className="absolute inset-0 flex flex-col justify-center gap-2 px-8 opacity-20" aria-hidden>
            {['const app = express();', 'app.use(cors());', 'mongoose.connect(DB_URI);', 'app.listen(PORT);'].map((line, i) => (
              <div key={i} className="font-mono text-[11px]" style={{ color: accentColor, paddingLeft: i * 12 }}>{line}</div>
            ))}
          </div>

          {/* Project icon */}
          <div
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 30px ${accentColor}30`,
            }}
          >
            <Code2 size={28} style={{ color: accentColor }} />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(11,16,32,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">{project.description}</p>
          </div>

          {/* Tech stack */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold font-mono"
                  style={{
                    background: `${accentColor}15`,
                    border: `1px solid ${accentColor}35`,
                    color: accentColor,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <MagneticButton
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                boxShadow: `0 4px 20px ${accentColor}40`,
              }}
            >
              <ExternalLink size={15} />
              <span>Live Preview</span>
            </MagneticButton>
            <MagneticButton
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-300 hover:text-white transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Github size={18} />
              <span>GitHub</span>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Project Card ─────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const { accentColor, gradient } = project;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      layout
      className="snap-center shrink-0 w-[300px] md:w-[330px] h-[420px] flex flex-col relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered
          ? 'rgba(15,22,40,0.92)'
          : 'rgba(11,16,32,0.55)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? accentColor + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? `0 0 40px ${accentColor}18, 0 20px 60px rgba(0,0,0,0.5)`
          : '0 8px 32px rgba(0,0,0,0.35)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Gradient top area */}
      <div
        className={`w-full h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden flex-shrink-0`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, ${accentColor} 0px, transparent 50%),
                            radial-gradient(circle at 70% 50%, ${accentColor}88 0px, transparent 40%)`,
        }} />

        {/* Floating icon */}
        <motion.div
          animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 0 24px ${accentColor}30`,
          }}
        >
          <Code2 size={24} style={{ color: accentColor }} />
        </motion.div>

        {/* "Click to expand" hint */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-0 right-0 flex justify-center"
            >
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  background: `${accentColor}25`,
                  border: `1px solid ${accentColor}40`,
                  color: accentColor,
                }}
              >
                Click to expand
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 gap-4 overflow-hidden">
        <div>
          <h3 className="text-white font-bold text-[16px] leading-snug">{project.title}</h3>
          <p className="text-gray-400 text-[12.5px] leading-relaxed mt-2 line-clamp-3">{project.description}</p>
        </div>

        {/* Tech pills with stagger animation */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}28`,
                color: accentColor,
              }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono text-gray-500 bg-white/5">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        className="shrink-0 px-6 py-4 flex items-center justify-between border-t"
        style={{ borderColor: `${accentColor}12` }}
      >
        <MagneticButton
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white transition-all duration-300"
          style={{
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}35`,
          }}
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={12} />
          Visit
        </MagneticButton>
        <MagneticButton
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          onClick={e => e.stopPropagation()}
        >
          <Github size={20} />
        </MagneticButton>
      </div>

      {/* Bottom glow line on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main Work Component ──────────────────────────────────────────────────── */
const Work = () => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Set up scroll listener
  React.useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full mt-6 relative min-h-[70vh]">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start text-left space-y-2 mb-8 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          My{' '}
          <span
            className="animate-gradient-text bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #6e93f7, #a78bfa, #8b5cf6)', backgroundSize: '200% 200%' }}
          >
            Projects
          </span>
        </h2>
        <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }} />
        <p className="text-gray-400 text-sm max-w-xl pt-1">
          A showcase of full-stack applications I've built — click any card for details.
        </p>
      </motion.div>

      {/* ── Carousel ── */}
      <div className="relative">
        {/* Left nav */}
        <AnimatePresence>
          {canLeft && (
            <motion.button
              key="left-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#6e93f7]/50 hover:bg-[#6e93f7]/10 transition-all duration-200 shadow-xl"
              style={{ background: 'rgba(8,10,22,0.85)', backdropFilter: 'blur(12px)' }}
            >
              <ChevronLeft size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right nav */}
        <AnimatePresence>
          {canRight && (
            <motion.button
              key="right-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#6e93f7]/50 hover:bg-[#6e93f7]/10 transition-all duration-200 shadow-xl"
              style={{ background: 'rgba(8,10,22,0.85)', backdropFilter: 'blur(12px)' }}
            >
              <ChevronRight size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0a0b14] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a0b14] to-transparent z-10 pointer-events-none" />

        {/* Scroll row */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 px-2 pb-4" style={{ width: 'max-content' }}>
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={idx}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Project count indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 mt-4 pl-2"
      >
        <span className="text-[11px] font-mono text-gray-600">{projects.length} projects</span>
        <div className="flex gap-1">
          {projects.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/15" />
          ))}
        </div>
      </motion.div>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Hide scrollbar */}
      <style>{`
        div[style*="scrollbar-width"]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Work;
