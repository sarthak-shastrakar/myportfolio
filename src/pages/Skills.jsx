import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

import jsImg from '../../media/JavascriptFile.e33114cc6fee28996422.png';
import cssImg from '../../media/css.80e21c1b90e0b94f7cec.png';
import dockerImg from '../../media/docker (1).8ab9c1399dbcfc426b1c.png';
import githubImg from '../../media/githubimg.7904b7ac6980e4a16c57.png';
import htmlImg from '../../media/html.1d475b8bee0ea4c12666.png';
import mongoImg from '../../media/mongo-db.82a700d00eb6023332fe.png';
import mysqlImg from '../../media/mysql.d46f0a0c8fa69c3174ef.png';
import reactImg from '../../media/react.26a94d6a11261a3115b1.png';
import tailwindImg from '../../media/tailwind-css.7be4720ced8e21af910b.png';

/* ── Category definitions ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all', name: 'All', icon: null, color: '#e0e7ff', glow: 'rgba(255,255,255,0.12)' },
  { id: 'frontend', name: 'Frontend', icon: Code2, color: '#6e93f7', glow: 'rgba(110,147,247,0.3)' },
  { id: 'backend', name: 'Backend', icon: Server, color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  { id: 'databases', name: 'Databases', icon: Database, color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
  { id: 'tools', name: 'Tools & DevOps', icon: Wrench, color: '#fb923c', glow: 'rgba(251,146,60,0.3)' },
];

const catColor = (id) => ({
  frontend: '#6e93f7', backend: '#8b5cf6', databases: '#34d399', tools: '#fb923c',
}[id] ?? '#e0e7ff');

const catGlow = (id) => ({
  frontend: 'rgba(110,147,247,0.25)', backend: 'rgba(139,92,246,0.25)',
  databases: 'rgba(52,211,153,0.25)', tools: 'rgba(251,146,60,0.25)',
}[id] ?? 'rgba(255,255,255,0.08)');

/* ── Skills Data with proficiency levels ──────────────────────────────────── */
const SKILLS_DATA = {
  frontend: [
    { name: 'React', proficiency: 90 },
    { name: 'JavaScript', proficiency: 88 },
    { name: 'HTML5', proficiency: 95 },
    { name: 'CSS3', proficiency: 85 },
    { name: 'Tailwind CSS', proficiency: 82 },
  ],
  backend: [
    { name: 'Node.js', proficiency: 85 },
    { name: 'Express.js', proficiency: 82 },
    { name: 'Socket.io', proficiency: 70 },
    { name: 'REST API', proficiency: 88 },
  ],
  databases: [
    { name: 'MongoDB', proficiency: 82 },
    { name: 'MySQL', proficiency: 70 },
  ],
  tools: [
    { name: 'Git & GitHub', proficiency: 90 },
    { name: 'Docker', proficiency: 65 },
    { name: 'Cloudinary', proficiency: 72 },
    { name: 'Netlify', proficiency: 78 },
    { name: 'Render', proficiency: 75 },
  ],
};

const getAbbreviation = (name) => {
  if (name === 'REST API') return 'API';
  if (name === 'Cloudinary') return 'CLD';
  if (name === 'Render') return 'RDR';
  return name.substring(0, 3).toUpperCase();
};

const getIconSrc = (name) => ({
  'React': reactImg,
  'JavaScript': jsImg,
  'HTML5': htmlImg,
  'CSS3': cssImg,
  'Tailwind CSS': tailwindImg,
  'Docker': dockerImg,
  'Git & GitHub': githubImg,
  'MongoDB': mongoImg,
  'MySQL': mysqlImg,
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Socket.io': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
  'Netlify': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
}[name] ?? null);

/* ── SVG Progress Ring ────────────────────────────────────────────────────── */
const ProgressRing = ({ proficiency, color, isInView }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  return (
    <svg width="56" height="56" className="absolute -top-1 -right-1" style={{ transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle
        cx="28" cy="28" r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2.5"
      />
      {/* Progress */}
      <circle
        cx="28" cy="28" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isInView ? offset : circumference}
        style={{
          transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)',
          filter: `drop-shadow(0 0 4px ${color}88)`,
        }}
      />
      {/* Proficiency text (rotated back upright) */}
      <text
        x="28" y="32"
        textAnchor="middle"
        fontSize="8"
        fill={color}
        fontFamily="monospace"
        fontWeight="700"
        style={{ transform: 'rotate(90deg)', transformOrigin: '28px 28px' }}
      >
        {proficiency}%
      </text>
    </svg>
  );
};

/* ── Individual Skill Card ────────────────────────────────────────────────── */
const SkillCard = ({ skill, category, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const color = catColor(category);
  const glow = catGlow(category);
  const iconSrc = getIconSrc(skill.name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tilt
        maxTilt={12}
        perspective={800}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#6e93f7"
        glarePosition="all"
        tiltReverse={false}
        transitionSpeed={500}
      >
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer overflow-hidden"
          style={{
            background: hovered
              ? `linear-gradient(135deg, rgba(11,16,32,0.9) 0%, ${color}10 100%)`
              : 'rgba(11,16,32,0.55)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${hovered ? color + '45' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: hovered
              ? `0 0 24px ${glow}, 0 8px 32px rgba(0,0,0,0.4)`
              : '0 4px 20px rgba(0,0,0,0.25)',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Top-left category dot */}
          <div
            className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />

          {/* Progress ring (top-right) */}
          <div className="absolute top-0 right-0">
            <ProgressRing proficiency={skill.proficiency} color={color} isInView={isInView} />
          </div>

          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0"
            style={{
              background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered ? color + '30' : 'rgba(255,255,255,0.06)'}`,
            }}
            animate={hovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {iconSrc ? (
              <img
                src={iconSrc}
                alt={skill.name}
                className="w-8 h-8 object-contain"
                style={{
                  opacity: hovered ? 1 : 0.75,
                  filter: hovered ? `drop-shadow(0 0 8px ${color}88)` : 'none',
                  transition: 'all 0.3s',
                }}
              />
            ) : (
              <span
                className="text-[11px] font-black tracking-wide"
                style={{ color, textShadow: hovered ? `0 0 12px ${color}` : 'none' }}
              >
                {getAbbreviation(skill.name)}
              </span>
            )}

            {/* Shine overlay on hover */}
            {hovered && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${color}22 0%, transparent 60%)`,
                }}
              />
            )}
          </motion.div>

          {/* Skill name */}
          <span
            className="text-[12px] font-semibold text-center leading-tight font-sans"
            style={{ color: hovered ? '#fff' : 'rgba(203,213,225,0.9)' }}
          >
            {skill.name}
          </span>

          {/* Bottom glow sweep on hover */}
          {hovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

/* ── Main Skills Component ────────────────────────────────────────────────── */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEntries = Object.entries(SKILLS_DATA).filter(
    ([cat]) => activeCategory === 'all' || cat === activeCategory
  );

  // Flatten for 'all' view — show as a single grid
  const allSkillsFlat = filteredEntries.flatMap(([cat, skills]) =>
    skills.map(skill => ({ ...skill, category: cat }))
  );

  return (
    <div className="flex flex-col gap-8 w-full mt-6">

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="flex flex-col space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            My{' '}
            <span
              className="animate-gradient-text bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #6e93f7, #a78bfa, #8b5cf6)', backgroundSize: '200% 200%' }}
            >
              Skills
            </span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }} />
          <p className="text-gray-400 text-sm max-w-xl pt-0.5">
            Hover any card to see proficiency • 3D tilt enabled on desktop
          </p>
        </div>

        {/* Total skill count badge */}
        <div
          className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
          style={{
            background: 'rgba(110,147,247,0.08)',
            border: '1px solid rgba(110,147,247,0.2)',
            color: '#6e93f7',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#6e93f7] animate-pulse" />
          {allSkillsFlat.length} technologies
        </div>
      </motion.div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2">
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 focus-visible:outline-none relative overflow-hidden"
              style={{
                background: isActive ? `${color}18` : 'rgba(255,255,255,0.03)',
                borderColor: isActive ? `${color}45` : 'rgba(255,255,255,0.07)',
                color: isActive ? color : 'rgba(138,147,179,1)',
                boxShadow: isActive ? `0 0 16px ${catGlow(cat.id)}` : 'none',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${color}10` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {Icon && <Icon size={11} className="relative z-10" />}
              <span className="relative z-10">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ══ SKILLS GRID ═══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          {activeCategory === 'all' ? (
            /* ── ALL: flat grid with category labels ── */
            <div className="space-y-8">
              {filteredEntries.map(([category, skills]) => {
                const color = catColor(category);
                const catMeta = CATEGORIES.find(c => c.id === category);
                const Icon = catMeta?.icon;
                return (
                  <div key={category}>
                    {/* Category label */}
                    <div className="flex items-center gap-2 mb-4">
                      {Icon && <Icon size={14} style={{ color }} />}
                      <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color }}>
                        {catMeta?.name}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {skills.map((skill, i) => (
                        <SkillCard key={skill.name} skill={skill} category={category} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── FILTERED: single flat grid ── */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredEntries.flatMap(([cat, skills]) =>
                skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} category={cat} index={i} />
                ))
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default Skills;
