import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronsRight } from 'lucide-react';
import { GithubIcon as Github } from '../components/icons';

const projects = [
  {
    title: "CareerForge AI",
    description: "AI-powered career coaching platform for ATS-optimized resumes, mock interviews, and cover letters — built with Gemini AI.",
    tags: ["React.js", "Node.js", "Gemini AI", "TailwindCSS"],
    color: "#6e93f7",
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
  },
  {
    title: "Video Conferencing App",
    description: "Real-time video conferencing app built on the MERN stack with WebRTC and Socket.io.",
    tags: ["MERN Stack", "Socket.io", "WebRTC", "React.js"],
    color: "#8b5cf6",
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
  },
  {
    title: "Personal Portfolio",
    description: "This portfolio — built with React, Framer Motion, and Tailwind CSS. Fully responsive with animated UI.",
    tags: ["React.js", "Framer Motion", "Tailwind CSS"],
    color: "#ff8a65",
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
  },
  {
    title: "Personal AI Chatbot",
    description: "Browser-based AI chatbot with a clean conversational UI, built with vanilla HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#34d399",
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
  },
  {
    title: "AI Assistant",
    description: "Simple browser-based AI assistant that responds to user input in real-time using JavaScript.",
    tags: ["HTML", "CSS3", "JavaScript"],
    color: "#f59e0b",
    liveUrl: "YOUR_LIVE_URL",
    githubUrl: "YOUR_GITHUB_URL",
  },
];

const Work = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Full Stack', 'Frontend', 'AI/ML'];

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Full Stack') return p.tags.includes('Node.js') || p.tags.includes('MERN Stack');
    if (filter === 'Frontend') return p.tags.includes('React.js') || p.tags.includes('HTML') || p.tags.includes('CSS');
    if (filter === 'AI/ML') return p.title.includes('AI') || p.tags.includes('Gemini AI');
    return true;
  });

  return (
    <div className="flex flex-col w-full mt-6 relative min-h-[70vh]">
      
      {/* Huge Background "WORK" watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 tracking-tighter pointer-events-none select-none z-0">
        WORK
      </div>

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

      {/* ── Filter Row ── */}
      <div className="flex flex-wrap gap-2 mb-4 z-10">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === f 
                ? 'bg-[#6e93f7]/20 text-[#6e93f7] border border-[#6e93f7]/30 shadow-[0_0_15px_rgba(110,147,247,0.15)]' 
                : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>



      {/* ── Horizontal Scrolling Container ── */}
      <div className="w-full overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar z-10">
        <div className="flex gap-6 px-1" style={{ width: 'max-content' }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const displayTags = project.tags.slice(0, 4);
              const extraTagsCount = project.tags.length - 4;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="snap-center shrink-0 w-[300px] md:w-[340px] h-[480px] flex flex-col relative group transition-all duration-300 rounded-3xl"
                  style={{
                    background: 'rgba(10, 11, 20, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  
                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-6 pb-20">
                    <h3 className="text-white font-bold text-xl text-center mb-6 leading-snug">
                      {project.title}
                    </h3>
                    
                    {/* Scrollable Description */}
                    <div className="h-[140px] overflow-y-auto mb-6 pr-2 hide-scrollbar">
                      <p className="text-[#d1d5db] font-serif text-[15px] text-center leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-[#1a202c] border border-white/5 text-xs text-[#38bdf8] px-3 py-1.5 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Footer (Absolute at bottom) */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-row items-center justify-between">
                    <a
                      href={project.liveUrl !== "YOUR_LIVE_URL" ? project.liveUrl : "#"}
                      target={project.liveUrl !== "YOUR_LIVE_URL" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="px-6 py-2 rounded-lg bg-[#1f2937] hover:bg-[#374151] text-white font-bold text-sm border-b-[3px] border-[#38bdf8] transition-colors"
                    >
                      Visit
                    </a>
                    
                    <a
                      href={project.githubUrl !== "YOUR_GITHUB_URL" ? project.githubUrl : "#"}
                      target={project.githubUrl !== "YOUR_GITHUB_URL" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-white hover:text-gray-300 transition-colors p-2"
                    >
                      <Github size={28} />
                    </a>
                  </div>


                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0 !important;
          height: 0 !important;
          background: transparent;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
    </div>
  );
};

export default Work;
