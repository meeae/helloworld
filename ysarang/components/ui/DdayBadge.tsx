import { getDdayColor } from '@/lib/dday'

interface DdayBadgeProps {
  dday: number
}

export function DdayBadge({ dday }: DdayBadgeProps) {
  const label = dday === 0 ? 'D-0' : dday > 0 ? `D-${dday}` : ''

  if (dday < 0) {
    return null
  }

  return (
    <span className={`text-badge ${getDdayColor(dday)}`}>
      {label}
    </span>
  )
}

