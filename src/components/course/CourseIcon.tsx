import Image from 'next/image';

const COURSE_ICONS: Record<string, string> = {
  'mechanical-engineering': '/badges/course-mechanical-engineering.png',
  'personal-finance': '/badges/course-personal-finance.png',
  'psychology': '/badges/course-psychology.png',
  'space-astronomy': '/badges/course-space-astronomy.png',
};

interface CourseIconProps {
  professionId: string;
  color: string;
  size?: number;
}

export function CourseIcon({ professionId, color, size = 22 }: CourseIconProps) {
  const src = COURSE_ICONS[professionId];

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        draggable={false}
      />
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
