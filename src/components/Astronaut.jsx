import React from 'react';

const Astronaut = ({ pose = 'floating', className = '' }) => {
  // Common style gradients and definitions
  const defs = (
    <defs>
      {/* Teal Visor Glow Gradients */}
      <radialGradient id="visorGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="70%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
      
      {/* Visor Reflection */}
      <linearGradient id="visorReflection" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="30%" stopColor="white" stopOpacity="0.05" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* Suit Gradient */}
      <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>

      {/* Coral Glow Gradient for Suit Lights */}
      <radialGradient id="coralGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff8a65" stopOpacity="1" />
        <stop offset="50%" stopColor="#ff8a65" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff8a65" stopOpacity="0" />
      </radialGradient>
      
      {/* Teal Glow for Holograms */}
      <radialGradient id="tealHolo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
        <stop offset="80%" stopColor="#2dd4bf" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
      </radialGradient>
      
      {/* Drop Shadows */}
      <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glowCoral" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.4" />
      </filter>
    </defs>
  );

  // Common body parts that stay the same across poses (Head, Visor, Backpack, Chest Plate)
  const renderBackpack = () => (
    <g id="backpack" filter="url(#shadow)">
      {/* Main tank */}
      <rect x="55" y="60" width="90" height="120" rx="20" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
      {/* Accents */}
      <rect x="65" y="70" width="70" height="10" rx="3" fill="#64748b" />
      {/* Side tubes */}
      <path d="M 55 100 Q 30 120 70 140" fill="none" stroke="#ff8a65" strokeWidth="3" filter="url(#glowCoral)" />
      <path d="M 145 100 Q 170 120 130 140" fill="none" stroke="#2dd4bf" strokeWidth="3" filter="url(#glowTeal)" />
    </g>
  );

  const renderHeadAndHelmet = () => (
    <g id="helmet-and-head" filter="url(#shadow)">
      {/* Helmet Base */}
      <circle cx="100" cy="55" r="38" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2.5" />
      {/* Visor Area */}
      <ellipse cx="100" cy="53" rx="28" ry="20" fill="url(#visorGlow)" stroke="#0f172a" strokeWidth="2" filter="url(#glowTeal)" />
      {/* Visor Reflection */}
      <ellipse cx="100" cy="53" rx="26" ry="18" fill="url(#visorReflection)" />
      <path d="M 80 48 Q 100 38 120 48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      
      {/* Coral status lights on helmet side */}
      <circle cx="68" cy="55" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" />
      <circle cx="132" cy="55" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" />
    </g>
  );

  const renderTorso = () => (
    <g id="torso" filter="url(#shadow)">
      {/* Suit Main Body */}
      <path d="M 68 85 L 132 85 Q 140 140 125 155 L 75 155 Q 60 140 68 85 Z" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
      {/* Collar */}
      <path d="M 72 85 Q 100 95 128 85" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      
      {/* Chest Control Box */}
      <rect x="82" y="98" width="36" height="30" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      {/* Screen/Details on chest box */}
      <rect x="88" y="103" width="12" height="8" rx="1" fill="#0f172a" />
      {/* Coral led */}
      <circle cx="108" cy="107" r="2" fill="#ff8a65" filter="url(#glowCoral)" />
      {/* Teal indicators */}
      <circle cx="91" cy="118" r="1.5" fill="#2dd4bf" filter="url(#glowTeal)" />
      <circle cx="97" cy="118" r="1.5" fill="#2dd4bf" filter="url(#glowTeal)" />
      <circle cx="103" cy="118" r="1.5" fill="#38bdf8" />
      <rect x="108" y="116" width="6" height="3" rx="0.5" fill="#ff8a65" />
    </g>
  );

  const renderHologram = () => {
    if (pose === 'coding') {
      return (
        <g id="hologram-keyboard" className="animate-pulse" filter="url(#glowTeal)">
          {/* Hologram base plane */}
          <polygon points="50,140 150,140 165,160 35,160" fill="rgba(45, 212, 191, 0.15)" stroke="#2dd4bf" strokeWidth="1" />
          {/* Keys/grid lines */}
          <line x1="60" y1="145" x2="140" y2="145" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />
          <line x1="55" y1="150" x2="145" y2="150" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="155" x2="150" y2="155" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />
          {/* Vertical dividers */}
          <line x1="70" y1="140" x2="65" y2="160" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <line x1="90" y1="140" x2="88" y2="160" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <line x1="110" y1="140" x2="112" y2="160" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <line x1="130" y1="140" x2="135" y2="160" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          {/* Code particles emitting upward */}
          <circle cx="75" cy="132" r="1.5" fill="#2dd4bf" />
          <circle cx="105" cy="125" r="1" fill="#2dd4bf" />
          <circle cx="125" cy="130" r="2" fill="#2dd4bf" />
          <circle cx="60" cy="128" r="1" fill="#2dd4bf" />
        </g>
      );
    }
    if (pose === 'exploring') {
      return (
        <g id="hologram-map" className="animate-pulse" filter="url(#glowTeal)">
          {/* Hologram Compass/Sphere */}
          <circle cx="100" cy="150" r="25" fill="rgba(45, 212, 191, 0.08)" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="100" cy="150" r="12" fill="none" stroke="#2dd4bf" strokeWidth="1" />
          {/* Orbit paths */}
          <ellipse cx="100" cy="150" rx="35" ry="10" fill="none" stroke="#2dd4bf" strokeWidth="1" transform="rotate(-15 100 150)" opacity="0.7" />
          <ellipse cx="100" cy="150" rx="35" ry="10" fill="none" stroke="#2dd4bf" strokeWidth="1" transform="rotate(25 100 150)" opacity="0.7" />
          {/* Constellation dots */}
          <circle cx="70" cy="142" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" />
          <circle cx="130" cy="158" r="2.5" fill="#2dd4bf" />
          <circle cx="100" cy="125" r="2" fill="#2dd4bf" />
          <line x1="70" y1="142" x2="100" y2="125" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.4" />
          <line x1="100" y1="125" x2="130" y2="158" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.4" />
        </g>
      );
    }
    if (pose === 'celebrating') {
      return (
        <g id="hologram-star" className="animate-pulse">
          {/* Hologram Star trophy/badge floating between hands */}
          <polygon points="100,122 104,132 114,133 107,140 109,150 100,144 91,150 93,140 86,133 96,132" fill="rgba(255, 138, 101, 0.2)" stroke="#ff8a65" strokeWidth="1.5" filter="url(#glowCoral)" />
          <circle cx="100" cy="137" r="16" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 2" filter="url(#glowTeal)" />
        </g>
      );
    }
    return null;
  };

  const renderArms = () => {
    switch (pose) {
      case 'waving':
        return (
          <g id="arms">
            {/* Left Arm (Relaxed) */}
            <path d="M 66 90 C 50 105 45 125 52 135 C 55 140 60 140 62 135 C 68 125 70 105 70 90" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="53" cy="137" r="8" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Left Glove */}
            
            {/* Right Arm (Waving) */}
            <path d="M 134 90 C 150 75 160 55 155 45 C 152 40 146 40 142 45 C 132 58 128 75 128 90" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="154" cy="42" r="8" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Right Glove */}
            {/* Wave animation helper waves */}
            <path d="M 166 34 Q 172 40 168 46" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            <path d="M 172 30 Q 180 38 174 46" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
          </g>
        );
      case 'coding':
        return (
          <g id="arms">
            {/* Coding pose: both arms bent forward pointing towards the hologram keyboard */}
            {/* Left Arm */}
            <path d="M 68 95 C 45 105 40 125 55 135 L 75 130" fill="none" stroke="url(#suitGradient)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 68 95 C 45 105 40 125 55 135 L 75 130" fill="none" stroke="#94a3b8" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" opacity="0.1" />
            <circle cx="75" cy="130" r="7" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Glove */}

            {/* Right Arm */}
            <path d="M 132 95 C 155 105 160 125 145 135 L 125 130" fill="none" stroke="url(#suitGradient)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 132 95 C 155 105 160 125 145 135 L 125 130" fill="none" stroke="#94a3b8" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" opacity="0.1" />
            <circle cx="125" cy="130" r="7" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Glove */}
          </g>
        );
      case 'exploring':
        return (
          <g id="arms">
            {/* Left Arm holding hologram */}
            <path d="M 68 95 C 45 105 50 135 70 145" fill="none" stroke="url(#suitGradient)" strokeWidth="16" strokeLinecap="round" />
            <circle cx="70" cy="145" r="7" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Right Arm pointing/interacting with hologram */}
            <path d="M 132 95 C 155 105 145 125 125 135" fill="none" stroke="url(#suitGradient)" strokeWidth="16" strokeLinecap="round" />
            <circle cx="125" cy="135" r="7" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>
        );
      case 'celebrating':
        return (
          <g id="arms">
            {/* Arms raised up in celebration */}
            {/* Left Arm raised */}
            <path d="M 68 90 C 50 70 40 50 50 40 C 55 35 62 40 68 55" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="48" cy="38" r="8" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Right Arm raised */}
            <path d="M 132 90 C 150 70 160 50 150 40 C 145 35 138 40 132 55" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="152" cy="38" r="8" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>
        );
      case 'floating':
      default:
        return (
          <g id="arms">
            {/* Floating: Both arms slightly bent outwards */}
            <path d="M 66 90 C 45 102 38 120 45 130 C 50 135 55 130 58 125 C 65 110 70 100 70 90" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="43" cy="131" r="7.5" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Left Glove */}

            <path d="M 134 90 C 155 102 162 120 155 130 C 150 135 145 130 142 125 C 135 110 130 100 130 90" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="157" cy="131" r="7.5" fill="#ff8a65" stroke="#e2e8f0" strokeWidth="1.5" /> {/* Right Glove */}
          </g>
        );
    }
  };

  const renderLegs = () => {
    switch (pose) {
      case 'floating':
        return (
          <g id="legs" filter="url(#shadow)">
            {/* Legs floating, left leg slightly higher, right slightly lower, slightly bent */}
            {/* Left Leg */}
            <path d="M 75 152 Q 62 175 68 200 C 70 205 78 205 82 200 Q 86 182 87 152 Z" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 68 200 H 82 L 80 208 H 64 Z" fill="#64748b" stroke="#475569" strokeWidth="1.5" /> {/* Left Boot */}
            <circle cx="73" cy="204" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" /> {/* Coral light on boot */}

            {/* Right Leg */}
            <path d="M 125 152 Q 138 180 130 206 C 127 212 119 212 116 206 Q 114 186 113 152 Z" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 130 206 H 116 L 118 214 H 132 Z" fill="#64748b" stroke="#475569" strokeWidth="1.5" /> {/* Right Boot */}
            <circle cx="124" cy="210" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" /> {/* Coral light on boot */}
          </g>
        );
      case 'waving':
      case 'coding':
      case 'exploring':
      case 'celebrating':
      default:
        return (
          <g id="legs" filter="url(#shadow)">
            {/* More standing / balanced pose */}
            {/* Left Leg */}
            <path d="M 75 152 V 195 C 75 200 65 200 65 195 Z" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 75 194 H 61 L 62 202 H 76 Z" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
            <circle cx="68" cy="198" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" />

            {/* Right Leg */}
            <path d="M 125 152 V 195 C 125 200 135 200 135 195 Z" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 125 194 H 139 L 138 202 H 124 Z" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
            <circle cx="132" cy="198" r="2.5" fill="#ff8a65" filter="url(#glowCoral)" />
          </g>
        );
    }
  };

  // Determine standard animation class based on pose
  const animationClass = pose === 'floating' ? 'animate-float-astronaut' : 'animate-float-slow';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Dynamic background glow ring */}
      <div className="absolute inset-0 rounded-full bg-radial-orb opacity-40 blur-2xl pointer-events-none" />

      {/* Main Astronaut SVG */}
      <svg
        viewBox="0 0 200 230"
        className={`w-full h-full max-w-[320px] drop-shadow-[0_20px_50px_rgba(139,92,246,0.15)] ${animationClass}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {defs}
        <g id="astronaut-character">
          {renderBackpack()}
          {renderLegs()}
          {renderTorso()}
          {renderArms()}
          {renderHeadAndHelmet()}
          {renderHologram()}
        </g>
      </svg>
    </div>
  );
};

export default Astronaut;
