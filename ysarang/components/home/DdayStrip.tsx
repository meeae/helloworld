import { SCHEDULES } from '@/data/schedules'
import { calcDday, getDdayColor } from '@/lib/dday'

export function DdayStrip() {
  const upcoming = SCHEDULES
    .map((item) => {
      const dday = calcDday(item.targetDate)
      return { ...item, dday }
    })
    .filter((item) => item.dday >= 0)
    .sort((a, b) => a.dday - b.dday)
    .slice(0, 5)

  if (upcoming.length === 0) return null

  return (
    <div className="border-b border-brand-light bg-brand-light py-2 px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto text-caption">
        {upcoming.map((schedule) => (
          <div key={schedule.id} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium text-gray-700">{schedule.title}</span>
            <span className={`text-badge ${getDdayColor(schedule.dday)}`}>
              {schedule.dday === 0 ? 'D-0' : `D-${schedule.dday}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

