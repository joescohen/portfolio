interface Tab {
  id: string
  label: string
}

interface TabNavProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export function TabNav({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="relative bg-white border-b border-zinc-200">
      <div className="px-6 lg:px-12 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-3 text-sm whitespace-nowrap transition-colors -mb-0.5 border-b-2 ${
              activeTab === tab.id
                ? 'text-navy font-bold border-orange-500'
                : 'text-slate-400 hover:text-slate-600 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
