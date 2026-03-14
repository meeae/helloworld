import Link from 'next/link'
import { FAQS } from '@/data/faqs'

interface FaqPanelProps {
  moreHref?: string
}

export function FaqPanel({ moreHref = '/support' }: FaqPanelProps) {
  const items = FAQS.slice(0, 4)

  return (
    <section className="h-full px-5 py-[18px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-card text-gray-900">자주 묻는 질문</h2>
        <Link href={moreHref} className="text-caption text-gray-400">
          전체 보기 +
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-caption text-gray-700">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="font-medium text-gray-800 hover:text-brand"
          >
            Q. {item.question}
          </Link>
        ))}
      </div>
    </section>
  )
}

