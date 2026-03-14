import Link from 'next/link'
import { UPDATES } from '@/data/updates'
import { Badge } from '@/components/ui/Badge'

interface UpdatesPanelProps {
  moreHref?: string
}

export function UpdatesPanel({ moreHref = '/updates' }: UpdatesPanelProps) {
  const items = [...UPDATES].slice(0, 4)

  return (
    <section className="h-full border-r border-[#E5E5E5] px-5 py-[18px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-card text-gray-900">제품 업데이트</h2>
        <Link href={moreHref} className="text-caption text-gray-400">
          전체 보기 +
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-caption text-gray-700">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Badge type={item.type} />
              <span className="truncate">{item.title}</span>
            </div>
            <div className="ml-2 flex flex-col items-end gap-0.5 text-[11px] text-gray-500">
              <span>{item.version}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

