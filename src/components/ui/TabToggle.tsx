'use client';

interface Tab<T extends string> {
  id: T;
  label: string;
  /** Optional notification badge count */
  badge?: number;
}

interface TabToggleProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
}

export function TabToggle<T extends string>({ tabs, activeTab, onChange }: TabToggleProps<T>) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 min-h-[44px] py-2.5 rounded-xl text-sm font-bold transition-colors relative ${
            activeTab === tab.id
              ? 'bg-primary-600 text-white'
              : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
          }`}
        >
          {tab.label}
          {tab.badge != null && tab.badge > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
