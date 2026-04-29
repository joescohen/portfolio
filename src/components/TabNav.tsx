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
    <div className="bg-slate-50 border-b-2 border-slate-200 px-6 lg:px-12 flex overflow-x-auto">
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
  )
}
