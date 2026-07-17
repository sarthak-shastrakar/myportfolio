import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, Check, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── Experience Data ──────────────────────────────────────────────────────── */
const experiences = [
  {
    role: 'Backend Developer Intern',
    company: 'AppVeda Software Technologies',
    companyUrl: 'https://appvedasoftware.in/',
    duration: 'Feb 2026 — Aug 2026',
    status: 'Current',
    statusIcon: Radio,
    nodeColor: '#2dd4bf',
    statusColor: 'text-[#2dd4bf] border-[#2dd4bf]/30 bg-[#2dd4bf]/10',
    bullets: [
      'Built and maintained REST APIs using Node.js and Express.js for live production projects.',
      'Managed database operations and schema design using MongoDB for industry-level applications.',
      'Deployed and managed backend services on a VPS server via Hostinger — handled server config, environment setup, and uptime monitoring.',
      'Worked on server-side logic, API security, and data validation for real client-facing systems.',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Hostinger', 'VPS'],
  },
  {
    role: 'Full Stack Web Developer Intern',
    company: 'Credora',
    duration: 'May 2025 — Jun 2025',
    status: 'Completed',
    statusIcon: Check,
    nodeColor: '#6e93f7',
    statusColor: 'text-[#6e93f7] border-[#6e93f7]/30 bg-[#6e93f7]/10',
    bullets: [
      'Contributed to building web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
      'Worked on both frontend UI components and backend API integration in a remote team environment.',
      'Gained hands-on experience with full-stack development workflow — from feature planning to deployment.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git'],
  },
];

/* ── Glowing Timeline Node ────────────────────────────────────────────────── */
const TimelineNode = ({ color, isActive }) => (
  <div
    className="absolute left-6 sm:left-1/2 z-10 flex items-center justify-center"
    style={{ transform: 'translate(-50%, 0)', top: '28px' }}
  >
    {/* Outer slow-pulse glow ring */}
    <motion.div
      className="absolute rounded-full"
      style={{ width: 36, height: 36, background: `radial-gradient(circle, ${color}55 0%, transparent 70%)` }}
      animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: isActive ? 1.8 : 2.6, repeat: Infinity, ease: 'easeOut' }}
    />
    {/* Secondary ring */}
    <motion.div
      className="absolute rounded-full border"
      style={{ width: 24, height: 24, borderColor: `${color}40` }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
      transition={{ duration: isActive ? 2.2 : 3.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
    />
    {/* Inner solid dot */}
    <div
      className="w-4 h-4 rounded-full border-2 relative z-10"
      style={{
        background: color,
        borderColor: '#0a0b14',
        boxShadow: `0 0 16px ${color}cc, 0 0 32px ${color}55`,
      }}
    />
  </div>
);

/* ── GSAP-Animated Timeline Line ──────────────────────────────────────────── */
const AnimatedTimelineLine = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    // Set initial state
    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.8,
      onUpdate: (self) => {
        gsap.to(line, {
          scaleY: self.progress,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-px pointer-events-none"
      style={{ background: 'rgba(110,147,247,0.06)' }}
    >
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6e93f7]/08 via-[#a78bfa]/08 to-[#2dd4bf]/08" />

      {/* GSAP-controlled draw line */}
      <div
        ref={lineRef}
        className="absolute inset-0 w-full"
        style={{
          background: 'linear-gradient(to bottom, #6e93f7, #a78bfa, #2dd4bf)',
          boxShadow: '0 0 8px rgba(110,147,247,0.5)',
          scaleY: 0,
          transformOrigin: 'top center',
        }}
      />

      {/* Traveling light pulse overlay */}
      <motion.div
        className="absolute w-full"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, transparent, rgba(110,147,247,0.6), rgba(167,139,250,0.6), transparent)',
          filter: 'blur(3px)',
        }}
        animate={{ top: ['0%', '80%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

/* ── Experience Card ──────────────────────────────────────────────────────── */
const ExperienceCard = ({ exp, index, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const StatusIcon = exp.statusIcon;
  const isActive = exp.status === 'Current';

  return (
    <div
      className={`relative flex flex-col sm:flex-row items-start w-full ${isEven ? 'sm:flex-row-reverse' : ''}`}
    >
      {/* Node */}
      <TimelineNode color={exp.nodeColor} isActive={isActive} />

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full sm:w-[calc(50%-44px)] ml-14 sm:ml-0"
      >
        <div
          className="p-5 rounded-2xl border space-y-4 relative overflow-hidden"
          style={{
            background: isActive
              ? 'rgba(11,16,32,0.7)'
              : 'rgba(11,16,32,0.5)',
            backdropFilter: 'blur(20px)',
            borderColor: isActive
              ? `${exp.nodeColor}30`
              : 'rgba(255,255,255,0.06)',
            boxShadow: isActive
              ? `0 0 30px ${exp.nodeColor}15, 0 8px 40px rgba(0,0,0,0.4)`
              : '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {/* Active card animated border glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  `0 0 0 1px ${exp.nodeColor}20`,
                  `0 0 0 1px ${exp.nodeColor}50`,
                  `0 0 0 1px ${exp.nodeColor}20`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${exp.nodeColor}15, transparent 70%)`,
            }}
          />

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
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 font-sans hover:text-gray-200 transition-colors"
                >
                  {exp.company}
                </a>
              ) : (
                <p className="text-xs text-gray-400 font-sans">{exp.company}</p>
              )}
            </div>

            {/* Status Badge */}
            {isActive ? (
              <motion.span
                className={`self-start flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${exp.statusColor} flex-shrink-0`}
                animate={{
                  boxShadow: [
                    `0 0 0px ${exp.nodeColor}00`,
                    `0 0 12px ${exp.nodeColor}55`,
                    `0 0 0px ${exp.nodeColor}00`,
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
              <span className={`self-start flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${exp.statusColor} flex-shrink-0`}>
                <StatusIcon size={10} />
                <span>{exp.status}</span>
              </span>
            )}
          </div>

          {/* Bullets — staggered reveal */}
          <ul className="space-y-2 pl-0 list-none">
            {exp.bullets.map((bullet, bulletIdx) => (
              <motion.li
                key={bulletIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.12 + 0.3 + bulletIdx * 0.06, duration: 0.4 }}
                className="flex items-start gap-2.5 text-[13px] text-gray-300 leading-relaxed"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: exp.nodeColor, boxShadow: `0 0 5px ${exp.nodeColor}80` }}
                />
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.tech.map((tag, tagIdx) => (
              <motion.span
                key={tagIdx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + 0.5 + tagIdx * 0.04 }}
                className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold"
                style={{
                  background: `${exp.nodeColor}10`,
                  border: `1px solid ${exp.nodeColor}25`,
                  color: `${exp.nodeColor}cc`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden sm:block w-[calc(50%-44px)]" />
    </div>
  );
};

/* ── Main Experience Component ────────────────────────────────────────────── */
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
          <span
            className="animate-gradient-text bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #6e93f7, #a78bfa, #8b5cf6)', backgroundSize: '200% 200%' }}
          >
            Experience
          </span>
        </h2>
        <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6e93f7, #8b5cf6)' }} />
        <p className="text-gray-400 text-sm max-w-xl pt-1">
          My journey as a developer — internships and hands-on projects.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <div className="relative max-w-3xl mx-auto w-full">
        <AnimatedTimelineLine />

        <div className="space-y-12 pt-2">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>

        {/* ── End cap ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(110,147,247,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(110,147,247,0.25)',
              }}
              animate={{
                scale: [1, 1.12, 1], boxShadow: [
                  '0 0 16px rgba(110,147,247,0.2)',
                  '0 0 32px rgba(110,147,247,0.4)',
                  '0 0 16px rgba(110,147,247,0.2)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Rocket size={20} className="text-[#6e93f7]" />
            </motion.div>
            <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Still Growing</p>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Experience;
