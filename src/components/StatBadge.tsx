interface StatBadgeProps {
  label: string
  variant?: 'primary' | 'secondary'
}

export function StatBadge({ label, variant = 'secondary' }: StatBadgeProps) {
  return (
    <span
      className={`rounded-full px-4 py-1 text-xs font-semibold whitespace-nowrap ${
        variant === 'primary'
          ? 'bg-orange-500 text-white'
          : 'bg-white/15 text-white'
      }`}
    >
      {label}
    </span>
  )
}
