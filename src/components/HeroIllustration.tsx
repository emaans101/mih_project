export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center p-4 select-none ${className}`}>
      {/* Ambient background pastel glow rings */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-[#EDE9FE]/70 blur-3xl" />
        <div className="w-56 h-56 rounded-full bg-[#E0E7FF]/60 blur-2xl translate-x-8 -translate-y-6" />
        <div className="w-48 h-48 rounded-full bg-[#FCE7F3]/50 blur-2xl -translate-x-8 translate-y-8" />
      </div>

      <svg
        viewBox="0 0 480 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[440px] h-auto drop-shadow-sm"
      >
        {/* Floating tech grid foundation */}
        <ellipse cx="240" cy="310" rx="190" ry="48" fill="#F1EFF9" stroke="#E2DCF8" strokeWidth="2" strokeDasharray="6 6" />
        <ellipse cx="240" cy="308" rx="140" ry="34" fill="#EDE9FE" fillOpacity="0.4" />

        {/* Floating cards representing Deduction Clues */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          {/* Card 1 - Left - Abstract/Idea */}
          <rect x="52" y="140" width="104" height="74" rx="14" fill="#FFFFFF" stroke="#E2DCF8" strokeWidth="2" />
          <rect x="66" y="156" width="36" height="8" rx="4" fill="#C4B5FD" />
          <rect x="66" y="172" width="76" height="6" rx="3" fill="#EDE9FE" />
          <rect x="66" y="184" width="54" height="6" rx="3" fill="#EDE9FE" />
          <circle cx="134" cy="160" r="8" fill="#DDD6FE" />
        </g>

        <g className="animate-pulse" style={{ animationDuration: '4.8s' }}>
          {/* Card 2 - Right - Tech/Code */}
          <rect x="324" y="110" width="108" height="80" rx="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <rect x="338" y="126" width="44" height="8" rx="4" fill="#7DD3FC" />
          <rect x="338" y="142" width="80" height="6" rx="3" fill="#E0F2FE" />
          <rect x="338" y="154" width="60" height="6" rx="3" fill="#E0F2FE" />
          <rect x="338" y="166" width="40" height="6" rx="3" fill="#E0F2FE" />
        </g>

        {/* Central Core: The Innovation Prism / Mystery Hub */}
        <g>
          {/* Pedestal pillars */}
          <rect x="226" y="235" width="28" height="65" rx="6" fill="#D8D2EE" />
          <ellipse cx="240" cy="235" rx="38" ry="12" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />

          {/* Central Hologram Hexagon */}
          <polygon
            points="240,90 295,122 295,186 240,218 185,186 185,122"
            fill="url(#prismGrad)"
            stroke="#8B5CF6"
            strokeWidth="2.5"
          />

          {/* Inner crystal facets */}
          <polygon points="240,90 295,122 240,154" fill="#C4B5FD" fillOpacity="0.5" />
          <polygon points="240,90 185,122 240,154" fill="#DDD6FE" fillOpacity="0.6" />
          <polygon points="185,122 185,186 240,154" fill="#A78BFA" fillOpacity="0.4" />
          <polygon points="295,122 295,186 240,154" fill="#8B5CF6" fillOpacity="0.3" />
          <polygon points="185,186 240,218 240,154" fill="#C4B5FD" fillOpacity="0.7" />
          <polygon points="295,186 240,218 240,154" fill="#EDE9FE" fillOpacity="0.9" />

          {/* Glowing Mystery Symbol in Center */}
          <circle cx="240" cy="154" r="16" fill="#FFFFFF" />
          <text
            x="240"
            y="160"
            textAnchor="middle"
            fill="#7C3AED"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Outfit, sans-serif"
          >
            ?
          </text>
        </g>

        {/* Detective Magnifying Glass - Overlaying Mystery with Clues */}
        <g transform="rotate(-15 170 210)">
          <circle cx="160" cy="200" r="32" fill="#FFFFFF" fillOpacity="0.4" stroke="#7C3AED" strokeWidth="5" />
          <circle cx="160" cy="200" r="26" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M184 224L214 254" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
          <circle cx="214" cy="254" r="4" fill="#5B21B6" />
        </g>

        {/* Connected Node Constellations (Bots thinking together) */}
        <line x1="156" y1="177" x2="185" y2="154" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="295" y1="154" x2="324" y2="150" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 4" />

        {/* Bot Icon Orbs Floating */}
        {/* Nova (Lilac) */}
        <g transform="translate(100, 75)">
          <circle cx="16" cy="16" r="18" fill="#FFFFFF" stroke="#D8B4FE" strokeWidth="2" />
          <circle cx="16" cy="16" r="12" fill="#F3E8FF" />
          <path d="M16 8L18 14L24 16L18 18L16 24L14 18L8 16L14 14Z" fill="#8B5CF6" />
        </g>

        {/* Byte (Blue) */}
        <g transform="translate(330, 50)">
          <circle cx="16" cy="16" r="18" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <circle cx="16" cy="16" r="12" fill="#E0F2FE" />
          <rect x="11" y="11" width="10" height="10" rx="2" fill="#0284C7" />
        </g>

        {/* Lumi (Yellow) */}
        <g transform="translate(280, 240)">
          <circle cx="14" cy="14" r="16" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="2" />
          <circle cx="14" cy="14" r="10" fill="#FEF3C7" />
          <circle cx="14" cy="14" r="5" fill="#F59E0B" />
        </g>

        {/* Pixel (Mint) */}
        <g transform="translate(85, 245)">
          <circle cx="14" cy="14" r="16" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="2" />
          <circle cx="14" cy="14" r="10" fill="#DCFCE7" />
          <rect x="10" y="10" width="8" height="8" rx="2" fill="#16A34A" />
        </g>

        {/* Little decorative sparkles */}
        <path d="M240 40L242 46L248 48L242 50L240 56L238 50L232 48L238 46Z" fill="#C4B5FD" />
        <path d="M190 60L191 64L195 65L191 66L190 70L189 66L185 65L189 64Z" fill="#FDE68A" />
        <path d="M290 70L291 74L295 75L291 76L290 80L289 76L285 75L289 74Z" fill="#BBF7D0" />

        <defs>
          <linearGradient id="prismGrad" x1="185" y1="90" x2="295" y2="218" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5F3FF" />
            <stop offset="0.5" stopColor="#EDE9FE" />
            <stop offset="1" stopColor="#DDD6FE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
