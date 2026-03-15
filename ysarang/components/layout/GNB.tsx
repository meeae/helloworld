'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
  highlight?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: '회사소개', href: '/about' },
  { label: '제품소개', href: '/products' },
  { label: '제품 업데이트', href: '/updates', highlight: true },
  { label: '주요 일정', href: '/schedule', highlight: true },
  { label: '고객센터', href: '/support' },
  { label: '미소센터', href: '/miso' },
]

const UTIL_LINKS = [
  { label: '원격지원', href: '/remote' },
  { label: '온라인 견적', href: '/quote' },
] as const

export function GNB() {
  const pathname = usePathname() || '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex h-13 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-card font-semibold text-brand">
            의사랑
          </Link>
          <nav className="hidden gap-4 text-sm md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'h-full border-b-2 border-transparent pb-1 text-sm',
                    item.highlight ? 'font-medium' : 'font-normal',
                    active ? 'border-brand text-brand font-medium' : 'text-gray-700 hover:text-brand',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden items-center gap-3 md:flex">
            {UTIL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-brand">
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/login" className="text-gray-600 hover:text-brand text-xs">
            로그인
          </Link>
          <Link
            href="/inquiry"
            className="rounded-[6px] bg-brand px-3 py-1 text-xs font-medium text-white"
          >
            제품 도입 문의
          </Link>
        </div>
      </div>
    </header>
  )
}

