interface CourseIconProps {
  professionId: string;
  color: string;
  size?: number;
}

export function CourseIcon({ professionId, color, size = 22 }: CourseIconProps) {
  if (professionId === 'mechanical-engineering') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (professionId === 'personal-finance') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="32" cy="34" r="26" fill="#A7F3D0" />
        {/* Ground line */}
        <rect x="8" y="52" width="48" height="2" rx="1" fill="#92400E" />
        {/* Big money bag */}
        <path d="M24 28c-6 0-10 4-10 12s4 12 12 12h8c8 0 12-4 12-12s-4-12-10-12H24Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
        <path d="M28 28c-2-3-1-5 1-7h6c2 2 3 4 1 7" fill="#EA580C" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Dollar sign on big bag */}
        <text x="32" y="44" textAnchor="middle" fill="#FEF3C7" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="12">$</text>
        {/* Gold band on big bag */}
        <rect x="24" y="28" width="16" height="2.5" rx="1" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
        {/* Small green bag */}
        <path d="M10 38c-3 0-5 2.5-5 7s2 7 6 7h5c4 0 6-2.5 6-7s-2-7-5-7H10Z" fill="#16A34A" stroke="#065F46" strokeWidth="1.5" />
        <path d="M12.5 38c-1-2-0.5-3.5 0.5-5h3.5c1 1.5 1.5 3 0.5 5" fill="#22C55E" stroke="#065F46" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Dollar sign on small bag */}
        <text x="14" y="48" textAnchor="middle" fill="#FEF3C7" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8">$</text>
        {/* Gold band on small bag */}
        <rect x="10" y="38" width="8" height="2" rx="1" fill="#FBBF24" stroke="#065F46" strokeWidth="0.6" />
        {/* Coin stack right */}
        <ellipse cx="50" cy="50" rx="5" ry="2" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
        <rect x="45" y="47" width="10" height="3" fill="#F59E0B" />
        <ellipse cx="50" cy="47" rx="5" ry="2" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
        <rect x="45" y="44" width="10" height="3" fill="#FBBF24" />
        <ellipse cx="50" cy="44" rx="5" ry="2" fill="#FCD34D" stroke="#92400E" strokeWidth="1" />
        {/* Small coin stack */}
        <ellipse cx="44" cy="52" rx="3.5" ry="1.5" fill="#F59E0B" stroke="#92400E" strokeWidth="0.8" />
        <rect x="40.5" y="50" width="7" height="2" fill="#F59E0B" />
        <ellipse cx="44" cy="50" rx="3.5" ry="1.5" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
        {/* Plant stem */}
        <line x1="32" y1="21" x2="32" y2="10" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="27" cy="16" rx="4" ry="2.2" transform="rotate(-30 27 16)" fill="#22C55E" stroke="#065F46" strokeWidth="1" />
        <ellipse cx="37" cy="13" rx="4" ry="2.2" transform="rotate(30 37 13)" fill="#16A34A" stroke="#065F46" strokeWidth="1" />
        {/* Coin on top */}
        <circle cx="32" cy="7" r="4" fill="#FBBF24" stroke="#92400E" strokeWidth="1.2" />
        <text x="32" y="9.5" textAnchor="middle" fill="#92400E" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="6">$</text>
        {/* Sparkles */}
        <line x1="9" y1="10" x2="11" y2="12" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="11" y1="10" x2="9" y2="12" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="54" cy="14" r="1" fill="#7C3AED" />
        <circle cx="7" cy="30" r="0.8" fill="#7C3AED" />
        <line x1="55" y1="25" x2="57" y2="27" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" />
        <line x1="57" y1="25" x2="55" y2="27" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  // Fallback: colored circle with first letter
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-black"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.5 }}
    >
      {professionId.charAt(0).toUpperCase()}
    </div>
  );
}
