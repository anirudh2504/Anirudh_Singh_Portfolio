// Animated "3D-style" robot used as the chat launcher.
// Pure SVG + CSS (see .robot rules in global.css): gradients and highlights give
// the depth, CSS animations do the float / sway / blink / antenna pulse.
//
// `mood` drives the eyes:
//   idle    — accent-coloured eyes that blink now and then
//   open    — happy squint while the chat panel is open
//   busy    — eyes scan left/right while an answer is on its way
//   offline — red eyes flashing (no API key configured)
export default function Robot({ mood = 'idle' }) {
  return (
    <span className={`robot robot--${mood}`} aria-hidden="true">
      <span className="robot-float">
        <svg className="robot-svg" viewBox="0 0 120 140" focusable="false">
          <defs>
            <linearGradient id="rb-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".45" stopColor="#dfe6f1" />
              <stop offset="1" stopColor="#9aa7bd" />
            </linearGradient>
            <linearGradient id="rb-metal-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c9d2e1" />
              <stop offset="1" stopColor="#7d8aa2" />
            </linearGradient>
            <linearGradient id="rb-visor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b2438" />
              <stop offset="1" stopColor="#070b14" />
            </linearGradient>
            <radialGradient id="rb-bulb" cx=".35" cy=".35" r=".7">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".35" className="rb-glow-stop" />
              <stop offset="1" className="rb-glow-stop rb-glow-stop--deep" />
            </radialGradient>
            <filter id="rb-eye-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* antenna */}
          <line x1="60" y1="24" x2="60" y2="10" stroke="url(#rb-metal-dark)" strokeWidth="3.5" strokeLinecap="round" />
          <circle className="robot-bulb" cx="60" cy="8" r="6" fill="url(#rb-bulb)" />

          {/* arms (behind the body) */}
          <g className="robot-arm robot-arm--left">
            <rect x="17" y="92" width="14" height="30" rx="7" fill="url(#rb-metal-dark)" />
            <circle cx="24" cy="123" r="6" fill="url(#rb-metal)" />
          </g>
          <g className="robot-arm robot-arm--right">
            <rect x="89" y="92" width="14" height="30" rx="7" fill="url(#rb-metal-dark)" />
            <circle cx="96" cy="123" r="6" fill="url(#rb-metal)" />
          </g>

          {/* body */}
          <rect x="52" y="78" width="16" height="10" rx="3" fill="url(#rb-metal-dark)" />
          <rect x="30" y="86" width="60" height="44" rx="18" fill="url(#rb-metal)" stroke="rgba(40,55,85,.25)" />
          <ellipse cx="46" cy="95" rx="11" ry="4" fill="#fff" opacity=".7" />
          <circle className="robot-heart" cx="60" cy="108" r="6.5" />
          <circle cx="58" cy="106" r="2" fill="#fff" opacity=".8" />

          {/* head */}
          <rect x="8" y="42" width="10" height="20" rx="5" fill="url(#rb-metal-dark)" />
          <rect x="102" y="42" width="10" height="20" rx="5" fill="url(#rb-metal-dark)" />
          <rect x="15" y="22" width="90" height="60" rx="26" fill="url(#rb-metal)" stroke="rgba(40,55,85,.25)" />
          <ellipse cx="38" cy="30" rx="16" ry="4.5" fill="#fff" opacity=".85" />

          {/* visor */}
          <rect x="25" y="36" width="70" height="34" rx="16" fill="url(#rb-visor)" />
          <path d="M33 41 q27 -6 54 0" stroke="#fff" strokeOpacity=".22" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* eyes */}
          <g className="robot-eyes" filter="url(#rb-eye-glow)">
            <rect className="robot-eye" x="40" y="46" width="12" height="14" rx="6" />
            <rect className="robot-eye" x="68" y="46" width="12" height="14" rx="6" />
          </g>
          <path className="robot-mouth" d="M53 64 q7 4 14 0" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="robot-shadow" />
    </span>
  )
}
