import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

import jsImg      from '../../media/JavascriptFile.e33114cc6fee28996422.png';
import cssImg     from '../../media/css.80e21c1b90e0b94f7cec.png';
import dockerImg  from '../../media/docker (1).8ab9c1399dbcfc426b1c.png';
import githubImg  from '../../media/githubimg.7904b7ac6980e4a16c57.png';
import htmlImg    from '../../media/html.1d475b8bee0ea4c12666.png';
import mongoImg   from '../../media/mongo-db.82a700d00eb6023332fe.png';
import mysqlImg   from '../../media/mysql.d46f0a0c8fa69c3174ef.png';
import reactImg   from '../../media/react.26a94d6a11261a3115b1.png';
import tailwindImg from '../../media/tailwind-css.7be4720ced8e21af910b.png';

/* ── Category definitions ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',       name: 'All',             icon: null,       color: '#e0e7ff', glow: 'rgba(255,255,255,0.1)' },
  { id: 'frontend',  name: 'Frontend',        icon: Code2,      color: '#6e93f7', glow: 'rgba(110,147,247,0.3)' },
  { id: 'backend',   name: 'Backend',         icon: Server,     color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)'  },
  { id: 'databases', name: 'Databases',       icon: Database,   color: '#34d399', glow: 'rgba(52,211,153,0.3)'  },
  { id: 'tools',     name: 'Tools & DevOps',  icon: Wrench,     color: '#fb923c', glow: 'rgba(251,146,60,0.3)'  },
];

const catColor = (id) => {
  switch (id) {
    case 'frontend':  return '#6e93f7';
    case 'backend':   return '#8b5cf6';
    case 'databases': return '#34d399';
    case 'tools':     return '#fb923c';
    default:          return '#e0e7ff';
  }
};

const catGlow = (id) => {
  switch (id) {
    case 'frontend':  return 'rgba(110,147,247,0.3)';
    case 'backend':   return 'rgba(139,92,246,0.3)';
    case 'databases': return 'rgba(52,211,153,0.3)';
    case 'tools':     return 'rgba(251,146,60,0.3)';
    default:          return 'rgba(255,255,255,0.1)';
  }
};

/* ── Skills Data ──────────────────────────────────────────────────────────── */
const SKILLS_DATA = {
  frontend: [
    { name: "React", icon: "react.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "HTML5", icon: "html5.svg" },
    { name: "CSS3", icon: "css3.svg" },
    { name: "Tailwind CSS", icon: "tailwindcss.svg" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "Express.js", icon: "express.svg" },
    { name: "Socket.io", icon: "socketio.svg" },
    { name: "REST API", icon: null },
  ],
  databases: [
    { name: "MongoDB", icon: "mongodb.svg" },
    { name: "MySQL", icon: "mysql.svg" },
  ],
  tools: [
    { name: "Git & GitHub", icon: "github.svg" },
    { name: "Docker", icon: "docker.svg" },
    { name: "Cloudinary", icon: null },
    { name: "Netlify", icon: "netlify.svg" },
    { name: "Render", icon: null },
  ],
};

/* ── Abbreviation helper ─────────────────────────────────────────────────── */
const getAbbreviation = (name) => {
  if (name === "REST API") return "API";
  if (name === "Cloudinary") return "CLD";
  if (name === "Render") return "RDR";
  return name.substring(0, 3).toUpperCase();
};

/* ── Resolve Icon Source ─────────────────────────────────────────────────── */
const getIconSrc = (name) => {
  switch (name) {
    case "React": return reactImg;
    case "JavaScript": return jsImg;
    case "HTML5": return htmlImg;
    case "CSS3": return cssImg;
    case "Tailwind CSS": return tailwindImg;
    case "Docker": return dockerImg;
    case "Git & GitHub": return githubImg;
    case "MongoDB": return mongoImg;
    case "MySQL": return mysqlImg;
    case "Node.js": return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
    case "Express.js": return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
    case "Socket.io": return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg";
    case "Netlify": return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg";
    default: return null;
  }
};

/* ── Main Skills Component ───────────────────────────────────────────────── */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-col gap-6 w-full mt-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="flex flex-col space-y-1">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            My <span className="bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] rounded-full" />
          <p className="text-gray-400 text-sm max-w-xl pt-1">
            Explore my tech stack — hover over any skill to learn more.
          </p>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2 text-left">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const color = catColor(cat.id);
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 focus-visible:outline-none"
              style={{
                background: isActive ? `${color}20` : 'rgba(255,255,255,0.03)',
                borderColor: isActive ? `${color}50` : 'rgba(255,255,255,0.06)',
                color: isActive ? color : 'rgba(138,147,179,1)',
                boxShadow: isActive ? `0 0 12px ${catGlow(cat.id)}` : 'none',
              }}
            >
              {Icon && <Icon size={12} />}
              <span>{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ══ CONTENT AREA ═════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {Object.entries(SKILLS_DATA)
              .filter(([category]) => activeCategory === 'all' || category === activeCategory)
              .map(([category, skills]) => {
                const catTitle = CATEGORIES.find(c => c.id === category)?.name || category;
                const color = catColor(category);
                const glow = catGlow(category);

                return (
                  <div
                    key={category}
                    className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
                  >
                    <h3 className="font-serif text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2" style={{ color }}>
                      <span>{catTitle}</span>
                    </h3>
                    
                    <div className="flex flex-col gap-3">
                      {skills.map((skill, skillIdx) => {
                        const iconSrc = getIconSrc(skill.name);
                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: skillIdx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-[#06080f]/40 relative group cursor-pointer transition-colors duration-300 hover:border-white/10"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 14px ${glow}`;
                              e.currentTarget.style.borderColor = color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = 'none';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                          >
                            {/* Skill Icon */}
                            <div className="w-12 h-12 rounded-lg bg-[#05071a] flex items-center justify-center flex-shrink-0 border border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                              {iconSrc ? (
                                <img
                                  src={iconSrc}
                                  alt={skill.name}
                                  className="w-7 h-7 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                                />
                              ) : (
                                <span className="text-[10px] font-bold" style={{ color }}>
                                  {getAbbreviation(skill.name)}
                                </span>
                              )}
                            </div>

                            <span className="text-sm font-semibold text-white font-sans">{skill.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Skills;
