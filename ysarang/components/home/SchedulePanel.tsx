import Link from 'next/link'
import { SCHEDULES } from '@/data/schedules'
import { calcDday } from '@/lib/dday'
import { DdayBadge } from '@/components/ui/DdayBadge'

interface SchedulePanelProps {
  moreHref?: string
}

export function SchedulePanel({ moreHref = '/schedule' }: SchedulePanelProps) {
  const items = SCHEDULES.map((s) => ({ ...s, dday: calcDday(s.targetDate) }))
    .filter((s) => s.dday >= 0)
    .sort((a, b) => a.dday - b.dday)
    .slice(0, 4)

  return (
    <section className="h-full border-r border-[#E5E5E5] px-5 py-[18px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-card text-gray-900">주요 일정</h2>
        <Link href={moreHref} className="text-caption text-gray-400">
          전체 보기 +
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-caption text-gray-700">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[11px] text-gray-500">{item.date}</span>
              <span className="truncate">{item.title}</span>
            </div>
            <DdayBadge dday={item.dday} />
          </div>
        ))}
      </div>
    </section>
  )
}

