# CLAUDE.md — 의사랑 홈페이지 개편 구현 가이드

> Claude Code 및 Cursor AI가 PRD를 기반으로 구현할 때 참조하는 AI 컨텍스트 파일입니다.
> 이 파일을 먼저 읽고 PRD.md의 요구사항에 따라 구현을 진행하세요.

---

## 1. 프로젝트 컨텍스트

- **프로젝트**: 의사랑(ysarang.com) 홈페이지 UI/UX 개편
- **회사**: (주)유비케어 — 의사랑 EMR 소프트웨어 제조사
- **핵심 사용자**: 병의원 원장(의사), 간호사, 실장 — EMR 소프트웨어 실사용자
- **PRD 참조**: `PRD.md` (동일 디렉토리)
- **기술 스택**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **패키지 매니저**: npm
- **아이콘**: lucide-react
- **폰트**: Pretendard (CDN)

---

## 2. 개발 진행 기록

### 완료된 작업 ✅
- [x] Next.js 14 프로젝트 초기화
- [x] tailwind.config.js 브랜드 컬러 토큰 등록
- [x] globals.css Pretendard 폰트 설정
- [x] lib/dday.ts D-day 계산 유틸
- [x] data/updates.ts mock 데이터
- [x] data/schedules.ts mock 데이터 (2026년 기준)
- [x] data/faqs.ts mock 데이터
- [x] components/ui/Badge.tsx
- [x] components/ui/DdayBadge.tsx
- [x] components/ui/Button.tsx
- [x] components/layout/AlertBar.tsx
- [x] components/layout/GNB.tsx (NavItem 타입 명시 완료)
- [x] components/layout/Footer.tsx
- [x] components/home/DdayStrip.tsx
- [x] components/home/HeroBanner.tsx
- [x] components/home/UpdatesPanel.tsx
- [x] components/home/SchedulePanel.tsx
- [x] components/home/FaqPanel.tsx
- [x] components/home/ShortcutBar.tsx
- [x] app/layout.tsx 조립
- [x] app/page.tsx 조립
- [x] Vercel 배포 완료 (https://ysarang.vercel.app)

### 진행 중 🔄
- [ ] 반응형 모바일 레이아웃 점검 (360px)
- [ ] 접근성 개선 (aria-label, 포커스 링)
- [ ] 디자인 토큰 CSS 변수 통일

### 예정 작업 📋
- [ ] app/updates/page.tsx 제품 업데이트 목록 페이지
- [ ] app/schedule/page.tsx 주요 일정 전체 페이지
- [ ] app/products/page.tsx 제품소개 랜딩 개편
- [ ] 사용성 테스트 진행

---

## 3. 디렉토리 구조

```
ysarang/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (AlertBar, GNB, Footer)
│   ├── page.tsx                # 메인 홈페이지
│   ├── updates/
│   │   └── page.tsx            # 제품 업데이트 목록
│   ├── schedule/
│   │   └── page.tsx            # 주요 일정
│   └── products/
│       └── page.tsx            # 제품소개 랜딩
├── components/
│   ├── layout/
│   │   ├── AlertBar.tsx        # 긴급공지 띠배너
│   │   ├── GNB.tsx             # 글로벌 내비게이션
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── DdayStrip.tsx       # D-day 일정 스트립
│   │   ├── HeroBanner.tsx      # 히어로 배너
│   │   ├── UpdatesPanel.tsx    # 제품 업데이트 패널
│   │   ├── SchedulePanel.tsx   # 주요 일정 패널
│   │   ├── FaqPanel.tsx        # FAQ 패널
│   │   └── ShortcutBar.tsx     # 고객지원 바로가기
│   └── ui/
│       ├── Badge.tsx           # 상태 뱃지
│       ├── DdayBadge.tsx       # D-day 색상 뱃지
│       └── Button.tsx          # 버튼 컴포넌트
├── data/
│   ├── updates.ts              # 제품 업데이트 mock 데이터
│   ├── schedules.ts            # 주요 일정 mock 데이터 (2026년 기준)
│   └── faqs.ts                 # FAQ mock 데이터
├── lib/
│   └── dday.ts                 # D-day 계산 유틸
├── styles/
│   └── globals.css
├── PRD.md
└── CLAUDE.md
```

---

## 4. 절대 규칙 (변경 금지)

### 4.1 디자인 원칙
- **브랜드 Primary 컬러**: `#D44A00` — tailwind `brand` 토큰으로만 사용
- **그림자 없음**: `shadow-*` 클래스 사용 금지. 구분은 `border`로만
- **flat design**: gradient는 히어로 배너 배경에만 허용
- **컴포넌트 분리**: 각 섹션은 반드시 독립 컴포넌트로 분리
- **하드코딩 금지**: 모든 색상은 tailwind 토큰 또는 CSS 변수 사용

### 4.2 TypeScript 규칙
- 모든 컴포넌트 Props는 `interface`로 명시적 타입 선언
- `as const` 배열에 optional 속성 접근 시 반드시 타입 선언
- `any` 타입 사용 금지

### 4.3 접근성 규칙
- 모든 버튼에 `aria-label` 필수
- 색상 대비 4.5:1 이상 유지 (WCAG 2.1 AA)
- 키보드 포커스 링 제거 금지 (`outline: none` 단독 사용 금지)
- 이미지에 `alt` 텍스트 필수

---

## 5. 디자인 토큰 (tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#D44A00',
          dark:    '#A83800',
          light:   '#FFF0E8',
        },
        status: {
          danger:  '#C8290A',
          warning: '#854F0B',
          safe:    '#3B6D11',
          info:    '#185FA5',
        },
        tag: {
          'new-bg':      '#FCEBEB',
          'new-text':    '#A32D2D',
          'update-bg':   '#E6F1FB',
          'update-text': '#185FA5',
          'fix-bg':      '#EAF3DE',
          'fix-text':    '#3B6D11',
          'urgent-bg':   '#FAEEDA',
          'urgent-text': '#854F0B',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
      },
    },
  },
  plugins: [],
}
module.exports = config
```

---

## 6. CSS 변수 (globals.css)

```css
@import "tailwindcss";

@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

:root {
  --color-brand:          #D44A00;
  --color-brand-dark:     #A83800;
  --color-brand-light:    #FFF0E8;
  --color-status-danger:  #C8290A;
  --color-status-warning: #854F0B;
  --color-status-safe:    #3B6D11;
  --color-status-info:    #185FA5;
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-border:         #E5E5E5;
  --color-bg-surface:     #FAFAFA;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --radius-sm: 6px;
  --radius-md: 10px;
}

.text-hero    { font-size: 28px; font-weight: 500; line-height: 1.35; }
.text-section { font-size: 20px; font-weight: 500; }
.text-card    { font-size: 14px; font-weight: 500; }
.text-body    { font-size: 14px; font-weight: 400; line-height: 1.7; }
.text-caption { font-size: 12px; font-weight: 400; }
.text-badge   { font-size: 11px; font-weight: 500; }
```

---

## 7. 핵심 컴포넌트 명세

### 7.1 GNB.tsx — 타입 선언 필수

```ts
type NavItem = {
  label: string
  href: string
  highlight?: boolean  // ← optional 명시 필수
}

const NAV_ITEMS: NavItem[] = [
  { label: '회사소개',    href: '/about' },
  { label: '제품소개',    href: '/products' },
  { label: '제품 업데이트', href: '/updates', highlight: true },
  { label: '주요 일정',   href: '/schedule', highlight: true },
  { label: '고객센터',    href: '/support' },
  { label: '미소센터',    href: '/miso' },
]
```

### 7.2 D-day 계산 (lib/dday.ts)

```ts
export function calcDday(targetDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function getDdayColor(dday: number): string {
  if (dday <= 7)  return 'text-status-danger'
  if (dday <= 14) return 'text-status-warning'
  return 'text-status-safe'
}

export function getDdayBgColor(dday: number): string {
  if (dday <= 7)  return 'bg-tag-new-bg text-tag-new-text'
  if (dday <= 14) return 'bg-tag-urgent-bg text-tag-urgent-text'
  return 'bg-tag-fix-bg text-tag-fix-text'
}
```

### 7.3 Badge.tsx

```tsx
type BadgeType = 'new' | 'update' | 'fix' | 'urgent'

const STYLES: Record<BadgeType, string> = {
  new:    'bg-tag-new-bg text-tag-new-text',
  update: 'bg-tag-update-bg text-tag-update-text',
  fix:    'bg-tag-fix-bg text-tag-fix-text',
  urgent: 'bg-tag-urgent-bg text-tag-urgent-text',
}

const LABELS: Record<BadgeType, string> = {
  new: '신규', update: '업데이트', fix: '수정', urgent: '긴급'
}

export function Badge({ type }: { type: BadgeType }) {
  return (
    <span className={`text-badge px-2 py-0.5 rounded-full ${STYLES[type]}`}
          aria-label={`${LABELS[type]} 태그`}>
      {LABELS[type]}
    </span>
  )
}
```

### 7.4 AlertBar.tsx — sessionStorage 닫기

```tsx
'use client'
import { useState, useEffect } from 'react'

interface AlertBarProps {
  type: 'danger' | 'warning' | 'info'
  message: string
  linkText?: string
  linkHref?: string
}

const BG: Record<string, string> = {
  danger:  'bg-status-danger',
  warning: 'bg-status-warning',
  info:    'bg-status-info',
}

export function AlertBar({ type, message, linkText, linkHref }: AlertBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const closed = sessionStorage.getItem('alertbar-closed')
    if (!closed) setVisible(true)
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('alertbar-closed', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="alert" className={`${BG[type]} text-white text-xs py-1.5 px-5 flex items-center justify-center gap-2`}>
      <span>{message}</span>
      {linkText && linkHref && (
        <a href={linkHref} className="underline opacity-80">{linkText}</a>
      )}
      <button onClick={handleClose} aria-label="공지 닫기"
              className="ml-4 opacity-60 hover:opacity-100 transition-opacity">✕</button>
    </div>
  )
}
```

---

## 8. 반응형 구현 규칙

```
모바일 우선 (mobile-first) 방식으로 작성

3단 패널:
  grid-cols-1 md:grid-cols-3

GNB:
  모바일: hidden → 햄버거 메뉴
  데스크탑: flex

D-day 스트립:
  모바일: overflow-x-auto, whitespace-nowrap
  데스크탑: flex-wrap

히어로:
  모바일: flex-col, 우측 카드 숨김
  데스크탑: flex-row
```

---

## 9. 자주 하는 실수 방지

| 실수 | 방지 방법 |
|------|-----------|
| `shadow-*` 사용 | border로 대체 |
| 인라인 hex 색상 | tailwind 토큰 사용 |
| NavItem highlight 타입 에러 | `NavItem` interface에 `highlight?: boolean` 명시 |
| D-day 음수 미처리 | `dday < 0` 필터링 필수 |
| schedules 연도 오류 | targetDate를 현재 연도(2026) 기준으로 설정 |
| GNB 미sticky | `sticky top-0 z-50 bg-white` 필수 |
| 모바일 3단→1단 미처리 | `grid-cols-1 md:grid-cols-3` |
| aria-label 누락 | 버튼·링크·아이콘 전체에 aria-label 필수 |
| postcss 설정 | postcss.config.cjs 사용 (package.json type:module 환경) |

---

## 10. 커밋 컨벤션

```
feat:     새 기능 추가
fix:      버그 수정
style:    스타일 변경 (기능 변화 없음)
refactor: 리팩토링
a11y:     접근성 개선
docs:     문서 수정

예시:
feat: GNB 제품 업데이트·주요 일정 메뉴 추가
feat: D-day 스트립 컴포넌트 구현
fix: GNB NavItem 타입 명시적 선언으로 빌드 에러 수정
fix: schedules targetDate 2026년으로 수정
a11y: AlertBar aria-label 추가
```

---

## 11. 완료 기준 (Definition of Done)

### 기능
- [ ] PRD F-01 ~ F-06 모든 기능 요구사항 구현
- [ ] D-day 계산 정확성 (당일=D-0, 지난 일정 필터, 2026년 기준)
- [ ] AlertBar sessionStorage 닫기 동작
- [ ] HeroBanner 슬라이드 4개 이하, CTA 버튼 포함

### 디자인 시스템
- [ ] 브랜드 오렌지 `#D44A00` 일관성
- [ ] 그림자(shadow) 미사용
- [ ] 모든 색상 tailwind 토큰 사용 (하드코딩 없음)
- [ ] Pretendard 폰트 로드 확인

### 반응형
- [ ] 모바일(360px) 레이아웃 정상
- [ ] 태블릿(768px) 레이아웃 정상
- [ ] 데스크탑(1280px) 레이아웃 정상

### 접근성
- [ ] 색상 대비 4.5:1 이상
- [ ] 키보드 네비게이션 동작
- [ ] aria-label 전체 적용

### 빌드
- [ ] `npm run build` 에러 없음
- [ ] TypeScript 타입 에러 없음
- [ ] Vercel 배포 성공