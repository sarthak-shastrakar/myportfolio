import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon as Github } from '../components/icons';

const projects = [
  {
    title: "CareerForge AI",
    description: "AI-powered career coaching platform for ATS-optimized resumes, mock interviews, and cover letters — built with Gemini AI and Openrouter API.",
    tags: ["React.js", "Node.js", "Gemini AI", "TailwindCSS", "Openrouter API"],
    liveUrl: "https://careerforge2.vercel.app/",
    githubUrl: "https://github.com/sarthak-shastrakar/nextstepai",
  },
  {
    title: "Video Conferencing App",
    description: "A real-time video conferencing application built using the MERN (MongoDB, Express, React, Node.js) technology stack.",
    tags: ["MERN Stack", "React.js", "Node.js", "MongoDB"],
    liveUrl: "https://conectify-frontend.onrender.com",
    githubUrl: "https://github.com/sarthak-shastrakar/conectify",
  },
  {
    title: "Personal Portfolio Website",
    description: "A personal portfolio website build using ReactJS, Framer-Motion and Animation. It is a responsive website with a clean and modern design.",
    tags: ["React.js", "AOS", "CSS"],
    liveUrl: "https://myportfolio-6sz6.onrender.com",
    githubUrl: "https://github.com/sarthak-shastrakar/myportfolio",
  },
  {
    title: "Personal AI Chatbot",
    description: "A simple yet fun AI chatbot built with HTML, CSS, and JavaScript. Try asking it questions!",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://sarthak-shastrakar.github.io/chatbot-AI/",
    githubUrl: "https://github.com/sarthak-shastrakar/chatbot-AI",
  },
  {
    title: "AI Assistant",
    description: "A simple, browser-based AI Assistant created using HTML, CSS, and JavaScript. Provides a clean and interactive chatbot interface that responds to user input in real-time.",
    tags: ["HTML", "CSS3", "JavaScript"],
    liveUrl: "https://sarthak-shastrakar.github.io/AI-assistant/",
    githubUrl: "https://github.com/sarthak-shastrakar/AI-assistant",
  },
  {
    title: "Travelling Site — StayCation",
    description: "A full-stack Airbnb-style travel website featuring property listings, Cloudinary image uploads, booking system, and responsive design. Built using Node.js, Express, EJS, MongoDB, and Cloudinary.",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Cloudinary", "Bootstrap5"],
    liveUrl: "https://travelling-site-airbnb.onrender.com",
    githubUrl: "https://github.com/sarthak-shastrakar/Travelling-site-Airbnb",
  },
  {
    title: "MARKETMITRA – E-commerce Platform",
    description: "A responsive local store e-commerce platform with product filtering, adding, cart functionality, and Cloudinary image uploads.",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Cloudinary", "Bootstrap5"],
    liveUrl: "https://e-commerce-maket-mitra.onrender.com",
    githubUrl: "https://github.com/sarthak-shastrakar/E-Commerce-Maket_Mitra",
  },
  {
    title: "Skin Disease Detection Using CNN",
    description: "A ML-based web app that detects skin diseases from images using a trained CNN model and provides diagnostic details.",
    tags: ["Streamlit", "Python", "TensorFlow", "Keras", "OpenCV", "ML/DL", "CNN", "FPDF", "Geopy"],
    liveUrl: "https://skin-diagnose-detection-project-001.streamlit.app/",
    githubUrl: "https://github.com/sarthak-shastrakar/skin-diagnose-detection-project",
  },
  {
    title: "Todo App [React]",
    description: "A todo app built using React.js technology with a clean and minimal UI.",
    tags: ["React.js", "JavaScript"],
    liveUrl: "https://sarthak-shastrakar.github.io/Todo-App/",
    githubUrl: "https://github.com/sarthak-shastrakar/Todo-App",
  },
  {
    title: "API Based Jokes Maker App",
    description: "A Jokes Maker App built using React.js technology that fetches jokes from an external API.",
    tags: ["React.js", "API"],
    liveUrl: "https://sarthak-shastrakar.github.io/Jokes_Maker/",
    githubUrl: "https://github.com/sarthak-shastrakar/Jokes_Maker",
  },
];

const Work = () => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full mt-6 relative min-h-[70vh]">

      {/* ── Header ── */}
      <div className="flex flex-col items-start text-left space-y-2 mb-6 relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          My <span className="bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] rounded-full" />
        <p className="text-gray-400 text-sm max-w-xl pt-1">
          A showcase of full-stack applications and projects I've built.
        </p>
      </div>

      {/* ── Horizontal Scrolling Section ── */}
      <div className="relative">
        {/* Left Button */}
        {canLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-[rgba(11,16,32,0.8)] backdrop-blur text-white/70 hover:text-white hover:border-[#6e93f7]/50 hover:bg-[rgba(110,147,247,0.1)] transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right Button */}
        {canRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-[rgba(11,16,32,0.8)] backdrop-blur text-white/70 hover:text-white hover:border-[#6e93f7]/50 hover:bg-[rgba(110,147,247,0.1)] transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Scroll Row */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto snap-x snap-mandatory work-hide-scrollbar"
        >
          <div className="flex gap-6 px-1" style={{ width: 'max-content' }}>
            <AnimatePresence mode="popLayout">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="card-glass snap-center shrink-0 w-[300px] md:w-[320px] h-[460px] flex flex-col relative transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  {/* ── Scrollable Inner Content ── */}
                  <div className="flex-1 overflow-y-auto card-scroll p-6 pb-4">

                    {/* Title */}
                    <h3 className="text-white font-bold text-[17px] text-center mb-4 leading-snug">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#d1d5db] text-[13px] text-center leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#93c5fd] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Extra bottom space so content doesn't hide behind footer */}
                    <div className="h-4" />
                  </div>

                  {/* ── Footer (always visible at bottom) ── */}
                  <div className="shrink-0 px-6 py-4 border-t border-white/[0.06] flex flex-row items-center justify-between bg-[rgba(11,16,32,0.4)] backdrop-blur-sm">
                    <a
                      href={project.liveUrl !== "YOUR_LIVE_URL" ? project.liveUrl : "#"}
                      target={project.liveUrl !== "YOUR_LIVE_URL" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="px-5 py-2 rounded-lg text-white font-bold text-sm border-b-[3px] border-[#6e93f7] transition-colors"
                      style={{ background: 'rgba(30,40,60,0.8)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(50,65,90,0.9)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(30,40,60,0.8)'}
                    >
                      Visit
                    </a>

                    <a
                      href={project.githubUrl !== "YOUR_GITHUB_URL" ? project.githubUrl : "#"}
                      target={project.githubUrl !== "YOUR_GITHUB_URL" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-white/60 hover:text-white transition-colors p-2"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* ── Hide scrollbar on cards row ── */
        .work-hide-scrollbar::-webkit-scrollbar { display: none; }
        .work-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── Card glassmorphism ── */
        .card-glass {
          background: rgba(11, 16, 32, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          transition: all 0.3s ease;
        }
        .card-glass:hover {
          border-color: rgba(110, 147, 247, 0.3);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 8px 30px rgba(110, 147, 247, 0.12);
          transform: translateY(-4px);
        }

        /* ── Purple vertical scrollbar inside each card ── */
        .card-scroll {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.7) rgba(255, 255, 255, 0.04);
        }
        .card-scroll::-webkit-scrollbar {
          display: block;
          width: 5px;
        }
        .card-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 99px;
          margin: 8px 0;
        }
        .card-scroll::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.7);
          border-radius: 99px;
        }
        .card-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.95);
        }
      `}} />
    </div>
  );
};

export default Work;
