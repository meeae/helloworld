import { DdayStrip } from '@/components/home/DdayStrip'
import { HeroBanner } from '@/components/home/HeroBanner'
import { UpdatesPanel } from '@/components/home/UpdatesPanel'
import { SchedulePanel } from '@/components/home/SchedulePanel'
import { FaqPanel } from '@/components/home/FaqPanel'
import { ShortcutBar } from '@/components/home/ShortcutBar'

export default function HomePage() {
  return (
    <main>
      {/* F-03: D-day 일정 스트립 */}
      <DdayStrip />

      {/* F-04: 히어로 배너 */}
      <HeroBanner />

      {/* F-05: 메인 3단 콘텐츠 영역 (제품 업데이트 / 주요 일정 / FAQ) */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 items-stretch overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white md:grid-cols-3">
          <UpdatesPanel />
          <SchedulePanel />
          <FaqPanel />
        </div>
      </section>

      {/* F-06: 고객지원 바로가기 */}
      <ShortcutBar />
    </main>
  )
}

