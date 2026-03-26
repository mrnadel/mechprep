'use client';

export function DebugScrollToLesson() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <button
      onClick={() => {
        const el = document.querySelector('[data-current-lesson]');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }}
      className="fixed z-[9998] bottom-32 left-4 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shadow-lg transition-colors select-none cursor-pointer"
      style={{
        background: 'rgba(31, 41, 55, 0.35)',
        color: 'rgba(209, 213, 219, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <span className="text-sm">📍</span>
      Go
    </button>
  );
}
