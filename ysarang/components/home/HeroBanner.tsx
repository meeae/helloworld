 'use client';

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

type HeroBadgeType = 'new' | 'update' | 'event'

interface HeroSlide {
  badge: { text: string; type: HeroBadgeType }
  headline: string
  subCopy: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  highlights: Array<{
    text: string
    tag?: string
    tagType?: 'new' | 'update' | 'fix'
  }>
}

const SLIDES: HeroSlide[] = [
  {
    badge: { text: '업데이트', type: 'update' },
    headline: '4월 수가변경 업데이트 안내',
    subCopy: '최신 수가 기준으로 자동 반영되는 업데이트 일정을 꼭 확인하세요.',
    primaryCta: { text: '업데이트 내용 보기', href: '/updates' },
    secondaryCta: { text: '사용 방법 가이드', href: '/support' },
    highlights: [
      { text: '4월 수가 변경 자동 반영', tagType: 'update' },
      { text: '청구 오류 최소화를 위한 개선', tagType: 'fix' },
      { text: '업데이트 일정 및 점검 시간 공지' },
    ],
  },
  {
    badge: { text: '신규 기능', type: 'new' },
    headline: 'CRM 문자발송 처방화면 연동',
    subCopy: '진료 중 바로 문자 발송이 가능해져 환자 커뮤니케이션이 더 쉬워집니다.',
    primaryCta: { text: '기능 상세 보기', href: '/products' },
    secondaryCta: { text: '도입 상담 신청', href: '/inquiry' },
    highlights: [
      { text: '처방화면에서 바로 문자 발송', tagType: 'new' },
      { text: '재진 알림 및 방문 독려 자동화' },
    ],
  },
]

const INTERVAL_MS = 5000

export function HeroBanner() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [index, paused])

  const slide = SLIDES[index]

  return (
    <section
      className="bg-[#1a1a2e] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row">
        {/* Left: text + CTAs */}
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-badge rounded-full bg-brand-light px-2 py-0.5 text-brand-dark">
              {slide.badge.text}
            </span>
          </div>
          <h1 className="text-hero text-white">{slide.headline}</h1>
          <p className="text-body text-gray-200">{slide.subCopy}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href={slide.primaryCta.href}>
              <Button variant="primary" className="text-sm">
                {slide.primaryCta.text}
              </Button>
            </Link>
            <Link href={slide.secondaryCta.href}>
              <Button variant="ghost" className="text-sm text-[#1a1a2e]">
                {slide.secondaryCta.text}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: highlights card */}
        <div className="mt-4 flex flex-1 justify-end md:mt-0">
          <div className="w-full max-w-md rounded-[10px] border border-gray-700 bg-gray-900 p-4">
            <h2 className="mb-3 text-card text-gray-100">이번 업데이트에서 달라지는 점</h2>
            <ul className="flex flex-col gap-2 text-caption text-gray-200">
              {slide.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {item.tagType && (
                    <span className="mt-[1px]">
                      <Badge type={item.tagType} />
                    </span>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

