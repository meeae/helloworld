import type { Metadata } from 'next'
import React from 'react'
import '@/styles/globals.css'
import { AlertBar } from '@/components/layout/AlertBar'
import { GNB } from '@/components/layout/GNB'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '의사랑 EMR - 홈페이지',
  description: '의사랑(ysarang.com) 홈페이지 UI/UX 개편',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-sans bg-[#FAFAFA] text-[#1A1A1A]">
        {/* F-02 긴급공지 띠배너 (필요 시 CMS 연동으로 대체 가능) */}
        <AlertBar
          type="info"
          message="의사랑 홈페이지 UI/UX 개편 베타 버전이 적용되었습니다."
          linkText="제품 업데이트 보기"
          linkHref="/updates"
        />
        {/* F-01 글로벌 내비게이션 */}
        <GNB />
        {/* 페이지 컨텐츠 */}
        {children}
        {/* 공통 Footer */}
        <Footer />
      </body>
    </html>
  )
}

