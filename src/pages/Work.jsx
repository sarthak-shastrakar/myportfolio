import React from 'react';
import { ExternalLink, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon as Github } from '../components/icons';
import { projectsData } from '../data/projects';

const Work = () => {
  return (
    <div className="flex flex-col gap-12 w-full mt-6 relative min-h-[70vh]">
      
      {/* Huge Background "WORK" watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 tracking-tighter pointer-events-none select-none z-0">
        WORK
      </div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start text-left space-y-2 mb-4 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          My <span className="bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] rounded-full" />
        <p className="text-gray-400 text-sm max-w-xl pt-1">
          A showcase of full-stack applications, front-end designs, and programming projects I have built.
        </p>
      </motion.div>

      {/* Header Scroll Animation */}
      <div className="flex flex-col items-center text-center z-10 pt-4">
        <motion.div 
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex items-center gap-2 text-[#6e93f7] opacity-80"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Scroll to view</span>
          <ChevronsRight size={18} />
        </motion.div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="w-full overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar z-10">
        <div className="flex gap-6 px-4 md:px-8" style={{ width: 'max-content' }}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="snap-center w-[300px] md:w-[350px] shrink-0 h-[450px] flex flex-col bg-[#06080f]/80 backdrop-blur-md rounded-3xl border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 relative group overflow-hidden"
            >
              
              {/* Subtle top gradient glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex-1 flex flex-col items-center text-center">
                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-auto pb-4">
                  {project.tech.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 rounded-md text-[11px] font-semibold bg-[#111625] text-[#2dd4bf] border border-[#2dd4bf]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 focus-visible:outline-none"
                >
                  Visit
                </a>
                
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all duration-300 focus-visible:outline-none"
                >
                  <Github size={20} />
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Work;
