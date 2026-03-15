import Link from 'next/link'
import { FileText, MapPin, Monitor, Phone, Pill } from 'lucide-react'

const SHORTCUTS = [
  { icon: Monitor, label: '원격 지원', desc: '원격으로 빠른 해결', href: '/remote' },
  { icon: Phone, label: '고객 지원', desc: '전화·채팅 문의', href: '/support' },
  { icon: FileText, label: '제품 도입 문의', desc: '신규 도입 상담', href: '/inquiry' },
  { icon: MapPin, label: 'MiSO 지역센터', desc: '가까운 센터 찾기', href: '/miso' },
  { icon: Pill, label: '의약품 검색', desc: '약품 코드 조회', href: '/medicine' },
] as const

export function ShortcutBar() {
  return (
    <section className="border-t border-[#E5E5E5] bg-[#F8F8F8] py-4">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-5">
        {SHORTCUTS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 border-l border-[#E5E5E5] px-4 py-3 last:border-r md:border-r-0"
            >
              <Icon className="mb-1 h-5 w-5 text-brand" />
              <span className="text-card text-gray-900">{item.label}</span>
              <span className="text-caption text-gray-500">{item.desc}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

