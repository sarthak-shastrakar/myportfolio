/**
 * MISSION CONFIG
 * Shared data for all 6 mission stops.
 * Used by WarpTransition, MissionHUD, Nav, and pages.
 */

export const MISSION_CONFIG = {
  '/': {
    id: '001',
    planet: 'TERRA',
    sector: 'Earth Orbit',
    status: 'Launch Ready',
    description: 'Mission Control',
    color: '#38bdf8',
    secondary: '#0ea5e9',
    glow: 'rgba(56,189,248,0.25)',
    planetType: 'TERRA',
  },
  '/about': {
    id: '002',
    planet: 'PERSONA',
    sector: 'Bio Atmosphere',
    status: 'Scanning',
    description: 'Commander Dossier',
    color: '#fb923c',
    secondary: '#f97316',
    glow: 'rgba(251,146,60,0.22)',
    planetType: 'PERSONA',
  },
  '/skills': {
    id: '003',
    planet: 'ARSENAL',
    sector: 'Tech Forge',
    status: 'All Systems Armed',
    description: 'Equipment Bay',
    color: '#22d3ee',
    secondary: '#06b6d4',
    glow: 'rgba(34,211,238,0.22)',
    planetType: 'ARSENAL',
  },
  '/work': {
    id: '004',
    planet: 'NEXUS',
    sector: 'Project Worlds',
    status: 'Exploring',
    description: 'Deployed Worlds',
    color: '#a78bfa',
    secondary: '#8b5cf6',
    glow: 'rgba(167,139,250,0.22)',
    planetType: 'NEXUS',
  },
  '/experience': {
    id: '005',
    planet: 'CHRONOS',
    sector: 'Time Rift',
    status: 'Logging Entry',
    description: 'Mission Logs',
    color: '#34d399',
    secondary: '#10b981',
    glow: 'rgba(52,211,153,0.22)',
    planetType: 'CHRONOS',
  },
  '/certification': {
    id: '006',
    planet: 'CORONA',
    sector: 'Achievement Belt',
    status: 'Collecting',
    description: 'Achievements Recovered',
    color: '#fbbf24',
    secondary: '#f59e0b',
    glow: 'rgba(251,191,36,0.22)',
    planetType: 'CORONA',
  },
};

export const MISSION_ORDER = ['/', '/about', '/skills', '/work', '/experience', '/certification'];

export const getMission = (pathname) =>
  MISSION_CONFIG[pathname] ?? MISSION_CONFIG['/'];
