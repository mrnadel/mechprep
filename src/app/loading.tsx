import { APP_NAME } from '@/lib/constants';

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FFB800] flex flex-col items-center justify-center">
      {/* Logo icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 animate-pulse">
        <span className="text-3xl font-black text-white select-none">M</span>
      </div>

      {/* App name */}
      <p className="text-xl font-black text-white tracking-tight mb-6">{APP_NAME}</p>

      {/* Loading bar */}
      <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full"
          style={{
            animation: 'loader-slide 1.2s ease-in-out infinite',
            width: '40%',
          }}
        />
      </div>

      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(180%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
