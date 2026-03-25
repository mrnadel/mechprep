export default function AppLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-black text-surface-800 mb-3">MechReady</p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
