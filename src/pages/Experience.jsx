import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Radio, Check, Hourglass, Rocket, GraduationCap, Zap } from 'lucide-react';

const experiences = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'Cybertech Solutions',
    duration: 'Jan 2025 — Present',
    status: 'Current',
    statusIcon: Radio,
    nodeColor: '#2dd4bf',
    statusColor: 'text-[#2dd4bf] border-[#2dd4bf]/30 bg-[#2dd4bf]/10',
    bullets: [
      'Developed and optimized MERN-stack administrative interfaces, boosting load speeds by 24%.',
      'Configured custom middleware validations, securing API endpoints and preventing unauthorized data leaks.',
      'Designed real-time update notifications utilizing socket protocols.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    role: 'Freelance Software Developer',
    company: 'CosmoCraft Tech',
    duration: 'Jun 2024 — Dec 2024',
    status: 'Completed',
    statusIcon: Check,
    nodeColor: '#6e93f7',
    statusColor: 'text-[#6e93f7] border-[#6e93f7]/30 bg-[#6e93f7]/10',
    bullets: [
      'Built and delivered custom responsive websites for local enterprise partners using Tailwind and React.',
      'Constructed modular database schemas, organizing product inventories with clean relations.',
      'Managed cloud setup and deployment configurations, achieving 99.9% uptime.',
    ],
    tech: ['React', 'PostgreSQL', 'Tailwind CSS', 'Git', 'Nginx'],
  },
  {
    role: 'B.E. Computer Engineering',
    company: 'Pune University',
    duration: 'Aug 2023 — Present',
    status: 'Ongoing',
    statusIcon: GraduationCap,
    nodeColor: '#a78bfa',
    statusColor: 'text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/10',
    bullets: [
      'Studying core computer architecture, database management systems (DBMS), and analysis of algorithms.',
      'Maintained consistent top-tier academic grades in programming subjects.',
      'Active coordinator in technical events and college-level coding hackathons.',
    ],
    tech: ['C++', 'Java', 'SQL', 'Data Structures', 'Algorithms'],
  },
  {
    role: 'Currently Exploring',
    company: 'Self-Directed Learning',
    duration: '2025 — Ongoing',
    status: 'Learning',
    statusIcon: Zap,
    nodeColor: '#ff8a65',
    statusColor: 'text-[#ff8a65] border-[#ff8a65]/30 bg-[#ff8a65]/10',
    bullets: [
      'Cloud-Native Architectures: Docker, Kubernetes & microservices orchestration.',
      'Advanced React Patterns: Server Components, concurrent rendering & performance tuning.',
      'AI & LLM Integration: Building assistant pipelines with OpenAI & LangChain.',
    ],
    tech: ['Docker', 'Kubernetes', 'AWS', 'LangChain', 'TypeScript'],
  },
];

// Animated node marker with pulsing glow ring
const TimelineNode = ({ color }) => (
  <div
    className="absolute left-6 sm:left-1/2 z-10 flex items-center justify-center"
    style={{ transform: 'translate(-50%, 0)', top: '24px' }}
  >
    {/* Outer slow-pulse glow ring */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 32,
        height: 32,
        background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
      }}
      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
    />
    {/* Inner solid dot */}
    <div
      className="w-4 h-4 rounded-full border-2 border-[#0a0b14] shadow-lg relative z-10"
      style={{
        background: color,
        boxShadow: `0 0 12px ${color}99, 0 0 24px ${color}44`,
      }}
    />
  </div>
);

// Animated gradient line that travels downward
const AnimatedTimelineLine = () => {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start end', 'end start'],
  });
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={lineRef}
      className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-px pointer-events-none overflow-hidden"
      style={{ background: 'rgba(110,147,247,0.08)' }}
    >
      {/* Static base line */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6e93f7]/10 via-[#a78bfa]/10 to-[#ff8a65]/10" />

      {/* Traveling glow band */}
      <motion.div
        className="absolute w-full"
        style={{
          height: '40%',
          top: gradientY,
          background:
            'linear-gradient(to bottom, transparent, #6e93f7cc, #a78bfacc, #ff8a6544, transparent)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

const Experience = () => {
  return (
    <div className="flex flex-col gap-10 w-full mt-6 pb-12">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start text-left space-y-2"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          Work{' '}
          <span className="bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6e93f7] to-[#8b5cf6] rounded-full" />
        <p className="text-gray-400 text-sm max-w-xl pt-1">
          My journey as a developer — internships, roles, and hands-on projects.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <div className="relative max-w-3xl mx-auto w-full">

        {/* Animated vertical center line */}
        <AnimatedTimelineLine />

        {/* ── Entries ── */}
        <div className="space-y-10 pt-2">
          {experiences.map((exp, index) => {
            const StatusIcon = exp.statusIcon;
            const isActive = exp.status === 'Current';
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start w-full ${isEven ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Node marker */}
                <TimelineNode color={exp.nodeColor} />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full sm:w-[calc(50%-36px)] ml-14 sm:ml-0"
                >
                  <div
                    className={`glass p-5 rounded-2xl border transition-colors duration-300 space-y-4 ${
                      isActive
                        ? 'border-[#2dd4bf]/25 shadow-[0_0_24px_rgba(45,212,191,0.08)]'
                        : 'border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Role Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[10px] font-mono font-bold tracking-wider"
                          style={{ color: exp.nodeColor }}
                        >
                          {exp.duration}
                        </span>
                        <h3 className="font-serif text-base font-bold text-white leading-snug mt-0.5">
                          {exp.role}
                        </h3>
                        <p className="text-xs text-gray-400 font-sans">{exp.company}</p>
                      </div>

                      {/* Status Badge */}
                      {isActive ? (
                        <motion.span
                          className={`self-start flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${exp.statusColor} flex-shrink-0`}
                          animate={{
                            boxShadow: [
                              '0 0 0px rgba(45,212,191,0)',
                              '0 0 10px rgba(45,212,191,0.45)',
                              '0 0 0px rgba(45,212,191,0)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          >
                            <StatusIcon size={10} />
                          </motion.span>
                          <span>{exp.status}</span>
                        </motion.span>
                      ) : (
                        <span
                          className={`self-start flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${exp.statusColor} flex-shrink-0`}
                        >
                          <StatusIcon size={10} />
                          <span>{exp.status}</span>
                        </span>
                      )}
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1.5 text-sm text-gray-300 font-sans list-none pl-0">
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2 leading-relaxed">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: exp.nodeColor }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/5 border border-white/10"
                          style={{ color: exp.nodeColor + 'cc' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block w-[calc(50%-36px)]" />
              </div>
            );
          })}
        </div>

        {/* ── End cap ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6e93f7]/20 to-[#8b5cf6]/20 border border-[#6e93f7]/30 flex items-center justify-center text-[#6e93f7]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Rocket size={18} />
            </motion.div>
            <p className="text-[11px] text-gray-500 font-mono tracking-wider">ACTIVE</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Experience;
