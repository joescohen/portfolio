export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
      {children}
    </p>
  )
}
