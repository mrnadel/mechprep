import { APP_NAME } from '@/lib/constants';

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#7C4DBA] flex flex-col items-center justify-center overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              left: `${10 + i * 11}%`,
              bottom: `${-5 + (i % 4) * 3}%`,
              animation: `loader-float ${5 + i * 0.7}s ${i * 0.5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Mascot with gentle bounce */}
      <div
        className="relative z-10 mb-2"
        style={{ animation: 'loader-bounce 2s ease-in-out infinite' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mascot/loading.png"
          alt=""
          width={140}
          height={140}
          className="drop-shadow-lg"
        />
      </div>

      {/* App name */}
      <p className="relative z-10 text-xl font-black text-white tracking-tight mb-6">
        {APP_NAME}
      </p>

      {/* Three bouncing dots */}
      <div className="relative z-10 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-white/70"
            style={{
              animation: `loader-dot 1s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loader-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes loader-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes loader-float {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          8% { opacity: 0.6; }
          50% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-600px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
