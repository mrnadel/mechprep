interface CourseIconProps {
  professionId: string;
  color: string;
  size?: number;
}

export function CourseIcon({ professionId, color, size = 22 }: CourseIconProps) {
  if (professionId === 'mechanical-engineering') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gear body */}
        <path
          d="M12 1.5l2.1 2.4h3l.9 2.9 2.6 1.5-.3 3 1.7 2.5-1.7 2.5.3 3-2.6 1.5-.9 2.9h-3L12 22.5l-2.1-2.3h-3l-.9-2.9-2.6-1.5.3-3L2 10.3l1.7-2.5-.3-3L6 3.3l.9-2.9h3L12 1.5Z"
          fill="#2563EB"
        />
        {/* Gear inner ring */}
        <circle cx="12" cy="12" r="6.5" fill="#3B82F6" />
        {/* Gear highlight ring */}
        <circle cx="12" cy="12" r="5" fill="#818CF8" />
        {/* Center hub */}
        <circle cx="12" cy="12" r="2.8" fill="#2563EB" />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.3" fill="#C7D2FE" />
        {/* Wrench accent */}
        <rect x="16.5" y="3" width="2.2" height="7" rx="1.1" transform="rotate(40 17.6 6.5)" fill="#A5B4FC" opacity="0.7" />
        <circle cx="19" cy="4" r="1.8" fill="#A5B4FC" opacity="0.5" />
      </svg>
    );
  }

  if (professionId === 'personal-finance') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back bill */}
        <rect x="1" y="6.5" width="16" height="11" rx="2" fill="#2D8C4E" />
        <rect x="1.8" y="7.3" width="14.4" height="9.4" rx="1.2" fill="#3BA55D" />
        <circle cx="9" cy="12" r="2.5" fill="#2D8C4E" opacity="0.5" />
        {/* Front bill */}
        <rect x="2.5" y="8.5" width="16" height="11" rx="2" fill="#34A853" />
        <rect x="3.3" y="9.3" width="14.4" height="9.4" rx="1.2" fill="#43C46E" />
        <circle cx="10.5" cy="14" r="2.5" fill="#34A853" opacity="0.5" />
        {/* Bill decorative corners */}
        <rect x="4.2" y="10.2" width="2" height="1.2" rx="0.6" fill="#34A853" opacity="0.6" />
        <rect x="14.8" y="17.6" width="2" height="1.2" rx="0.6" fill="#34A853" opacity="0.6" />
        {/* Gold coin */}
        <circle cx="18" cy="15.5" r="5.5" fill="#E5A100" />
        <circle cx="18" cy="15.5" r="4.3" fill="#FFC107" />
        <circle cx="18" cy="15.5" r="3.6" fill="#FFD54F" />
        {/* Dollar sign on coin */}
        <text x="18" y="17.8" textAnchor="middle" fill="#E5A100" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="6">$</text>
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
