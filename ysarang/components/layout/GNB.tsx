'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

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
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex h-13 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-card font-semibold text-brand">
            의사랑
          </Link>
          <nav className="hidden gap-4 text-sm md:flex" aria-label="메인 메뉴">
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
          <button
            type="button"
            className="flex items-center justify-center p-2 text-gray-700 hover:text-brand md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden items-center gap-3 md:flex">
            {UTIL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-brand">
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/login" className="hidden text-gray-600 hover:text-brand text-xs md:inline">
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

      {/* 모바일 드롭다운 */}
      <div
        className={[
          'overflow-hidden border-b border-gray-200 bg-white transition-all duration-200 md:hidden',
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <nav className="mx-auto max-w-6xl px-4 py-4" aria-label="모바일 메뉴">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={[
                      'block rounded-[6px] px-3 py-2 text-sm transition-all duration-200',
                      item.highlight ? 'font-medium text-brand' : 'text-gray-700',
                      active ? 'bg-brand-light text-brand' : 'hover:bg-gray-100 hover:text-brand',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 border-t border-gray-200 pt-3">
            {UTIL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-[6px] px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-brand transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={closeMobile}
              className="block rounded-[6px] px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-brand transition-all duration-200 md:hidden"
            >
              로그인
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

