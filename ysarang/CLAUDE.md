## CLAUDE.md — 의사랑 홈페이지 개편 구현 가이드

> 이 파일은 Claude Code 및 Cursor AI가 PRD를 기반으로 의사랑 홈페이지를 구현할 때 참조하는 지시 문서입니다.

---

## 1. 프로젝트 개요

- **프로젝트**: 의사랑(ysarang.com) 홈페이지 UI/UX 개편
- **PRD 참조**: `PRD.md` (동일 디렉토리)
- **기술 스택**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **패키지 매니저**: pnpm
- **아이콘**: lucide-react
- **폰트**: Pretendard (CDN)

> 구현 시, 기획 의도·기능 범위·우선순위는 항상 `PRD.md`를 1차 기준으로 삼고, 이 파일은 **개발 관점의 세부 가이드**로 사용한다.

---

## 2. 디렉토리 구조

아래 구조를 기본으로 사용하며, 다른 경로에 컴포넌트를 두지 않는다.

```txt
ysarang/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (AlertBar, GNB, Footer 포함)
│   ├── page.tsx                # 메인 홈페이지
│   ├── updates/
│   │   └── page.tsx            # 제품 업데이트 목록
│   ├── schedule/
│   │   └── page.tsx            # 주요 일정
│   └── products/
│       └── page.tsx            # 제품소개 랜딩
├── components/
│   ├── layout/
│   │   ├── AlertBar.tsx        # F-02: 긴급공지 띠배너
│   │   ├── GNB.tsx             # F-01: 글로벌 내비게이션
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── DdayStrip.tsx       # F-03: D-day 일정 스트립
│   │   ├── HeroBanner.tsx      # F-04: 히어로 배너
│   │   ├── UpdatesPanel.tsx    # F-05-1: 제품 업데이트 패널
│   │   ├── SchedulePanel.tsx   # F-05-2: 주요 일정 패널
│   │   ├── FaqPanel.tsx        # F-05-3: FAQ 패널
│   │   └── ShortcutBar.tsx     # F-06: 고객지원 바로가기
│   └── ui/
│       ├── Badge.tsx           # 상태 뱃지 (신규/업데이트/수정/긴급)
│       ├── DdayBadge.tsx       # D-day 색상 뱃지
│       └── Button.tsx          # Primary / Ghost / Text 버튼
├── data/
│   ├── updates.ts              # 제품 업데이트 mock 데이터
│   ├── schedules.ts            # 주요 일정 mock 데이터
│   └── faqs.ts                 # FAQ mock 데이터
├── lib/
│   └── dday.ts                 # D-day 계산 유틸
├── styles/
│   └── globals.css
├── PRD.md
└── CLAUDE.md
```

---

## 3. 핵심 구현 규칙

### 3.1 절대 규칙 (변경 금지)

다음 규칙은 PRD 개편 범위 내에서 **반드시 준수**해야 하며, 임의 변경 금지.

- **브랜드 Primary 컬러**: `#D44A00` (오렌지)
  - Tailwind `tailwind.config.ts`에 `brand` 컬러 토큰으로 등록 후 모든 UI에서 이 토큰을 사용한다.
- **폰트**: Pretendard만 사용
  - `globals.css`에서 `font-sans`를 Pretendard로 override.
  - 추가 폰트 패밀리 도입 금지.
- **그림자 없음**
  - `shadow-*` Tailwind 클래스 사용 금지.
  - 시각적 구분은 `border`, 컬러 대비, 여백으로만 처리.
- **Flat design 유지**
  - gradient 사용 최소화, 필요한 경우 **히어로/배너 배경 정도**로만 한정.
  - 입체감 과한 효과(글로우, 인텐스 그라데이션 등) 지양.
- **컴포넌트 분리**
  - PRD에 정의된 각 섹션은 **반드시 독립 컴포넌트**로 구현 (`components/layout`, `components/home`, `components/ui`).
  - 페이지 파일(`app/*.tsx`)에는 레이아웃 조립과 데이터 주입만 남기고, 내부 UI 로직은 컴포넌트로 분리.

### 3.2 컬러 토큰 (tailwind.config.ts에 등록)

가능한 한 인라인 hex 대신 컬러 토큰을 사용한다.  
반드시 아래 구조를 기반으로 Tailwind 설정을 구성한다.

```ts
// tailwind.config.ts (일부 예시)
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#D44A00',
        dark:    '#A83800',
        light:   '#FFF0E8',
      },
      status: {
        danger:  '#C8290A',   // D-7 이하, 긴급
        warning: '#854F0B',   // D-8~14
        safe:    '#3B6D11',   // D-15 이상
        info:    '#185FA5',
      },
      // tag는 실제 Tailwind에서는 중첩 객체 대신 의미 있는 클래스 이름으로 풀어서 사용하거나,
      // 컴포넌트 내부 상수(TAILWIND 클래스 문자열)로 관리
    },
  },
}
```

뱃지 컬러는 Tailwind 토큰으로 전부 표현하기 까다로우므로, `Badge.tsx` 내부 상수에서 인라인 hex를 관리해도 된다(아래 4.6 참고).

### 3.3 타이포그래피 클래스 (`styles/globals.css`에 정의)

아래 유틸 클래스를 전역에 정의하고, 텍스트 스타일은 최대한 이 유틸을 사용한다.

```css
.text-hero    { font-size: 28px; font-weight: 500; line-height: 1.35; }
.text-section { font-size: 20px; font-weight: 500; }
.text-card    { font-size: 14px; font-weight: 500; }
.text-body    { font-size: 14px; font-weight: 400; line-height: 1.7; }
.text-caption { font-size: 12px; font-weight: 400; }
.text-badge   { font-size: 11px; font-weight: 500; }
```

---

## 4. 컴포넌트별 구현 명세

각 컴포넌트는 PRD의 기능 번호(F-01~F-07)와 1:1로 매핑된다.

### 4.1 `components/layout/AlertBar.tsx` (F-02)

```txt
위치: 페이지 최상단 (GNB 위)
높이: 36px
동작: 우측 X 클릭 시 sessionStorage에 저장 후 숨김
```

**Props 인터페이스**

```ts
interface AlertBarProps {
  type: 'danger' | 'warning' | 'info'  // 배경색 결정
  message: string
  linkText?: string
  linkHref?: string
}
```

**색상 매핑**

- `danger` → `bg-[#C8290A] text-white`
- `warning` → `bg-[#854F0B] text-white`
- `info` → `bg-[#185FA5] text-white`

**구현 포인트**

- 클라이언트 컴포넌트로 구현 (`'use client'`).
- `sessionStorage` 키 예: `"ys-alertbar-dismissed"` (구체 키명은 컴포넌트 내 상수로 관리).
- 닫힘 여부는 `useEffect`로 초기화 후, 상태에 따라 렌더링 여부 결정.

---

### 4.2 `components/layout/GNB.tsx` (F-01)

```txt
높이: 52px
스크롤 시: sticky top-0, z-50, backdrop-blur 없이 bg-white border-b
```

**메뉴 구조**

```ts
const NAV_ITEMS = [
  { label: '회사소개',    href: '/about' },
  { label: '제품소개',    href: '/products' },
  { label: '제품 업데이트', href: '/updates',  highlight: true },  // 강조
  { label: '주요 일정',   href: '/schedule', highlight: true },    // 강조
  { label: '고객센터',    href: '/support' },
  { label: '미소센터',    href: '/miso' },
]
```

**유틸 링크 (우측)**

```ts
const UTIL_LINKS = [
  { label: '원격지원', href: '/remote' },
  { label: '온라인 견적', href: '/quote' },
]
```

**Active 스타일**

- 현재 경로와 `href`가 일치하는 경우:
  - `border-b-2 border-brand text-brand font-medium`
- Next App Router의 `usePathname()`를 사용해 active 상태 계산.

**구현 포인트**

- GNB 전체 래퍼에: `sticky top-0 z-50 bg-white border-b`.
- `highlight: true`인 메뉴는 일반 메뉴 대비 색상/굵기로 추가 강조 (예: `text-brand`).
- 우측 `제품 도입 문의` CTA와 로그인 링크는 PRD 기준으로 `/products` 혹은 문의용 URL로 연결 (세부 경로는 추후 확정 가능, 우선 더미 경로 사용).

---

### 4.3 `components/home/DdayStrip.tsx` (F-03)

```txt
위치: GNB 바로 아래
배경: bg-[#FFF8F0] border-b border-[#FAEEDA]
패딩: py-2 px-6
```

**D-day 계산 로직 (`lib/dday.ts`)**

```ts
export function calcDday(targetDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function getDdayColor(dday: number): string {
  if (dday <= 7)  return 'text-[#C8290A]'
  if (dday <= 14) return 'text-[#854F0B]'
  return 'text-[#3B6D11]'
}
```

**표시 규칙**

- 데이터 소스: `data/schedules.ts`의 `SCHEDULES`.
- 오늘 기준으로 지난 일정(`dday < 0`)은 필터링 후 노출하지 않는다.
- D-day가 가까운 순으로 정렬 후 **최대 5개**만 표시.
- 각 일정은 `date`, `title`, D-day 값(`D-3` 등)과 색상이 함께 노출된다.

---

### 4.4 `components/home/HeroBanner.tsx` (F-04)

```txt
배경: bg-[#1a1a2e] (진한 네이비)
높이: max-h-[320px]
구성: 좌측 텍스트 + CTA / 우측 변경사항 요약 카드
슬라이드: 최대 4개, 5초 자동 전환, 호버 정지
```

**Slide 데이터 구조**

```ts
interface HeroSlide {
  badge: { text: string; type: 'new' | 'update' | 'event' }
  headline: string      // 최대 25자
  subCopy: string       // 최대 60자
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  highlights: Array<{
    text: string
    tag?: string
    tagType?: 'new' | 'update' | 'fix'
  }>
}
```

**슬라이드 전환**

- 슬라이드 개수: 최대 4개 (정적 배열로 정의 가능).
- 자동 전환: 5초 간격, `setInterval` 또는 `setTimeout` 기반.
- 마우스 호버 시 자동 전환을 일시 정지.
- 전환 애니메이션은 **CSS transition**만 사용 (framer-motion 금지).

**구현 포인트**

- 좌측: `.text-hero`, `.text-body` 활용 + Primary/Secondary CTA 버튼 (`Button` 컴포넌트 사용).
- 우측 카드: `highlights` 목록과, 필요한 경우 `Badge`를 함께 노출.

---

### 4.5 `components/home/UpdatesPanel.tsx` / `SchedulePanel.tsx` / `FaqPanel.tsx` (F-05)

세 패널은 동일한 레이아웃 컨테이너를 공유한다.

```tsx
// 공통 패널 래퍼
<section className="border-r border-[#E5E5E5] px-5 py-[18px] h-full">
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-card">{title}</h2>
    <Link href={moreHref} className="text-caption text-gray-400">
      전체 보기 +
    </Link>
  </div>
  {children}
</section>
```

**UpdatesPanel 아이템 구조**

```ts
interface UpdateItem {
  id: string
  type: 'new' | 'update' | 'fix' | 'urgent'
  title: string
  version: string   // 예: "v24.3"
  date: string      // 예: "2025.03.13"
}
```

**SchedulePanel 아이템 구조**

```ts
interface ScheduleItem {
  id: string
  date: string        // 예: "03.16"
  title: string
  targetDate: string  // D-day 계산 기준 (예: "2025-03-16")
}
```

**FaqPanel 데이터 구조 (예시)**

```ts
interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string
}
```

**공통 구현 포인트**

- 메인 그리드: `grid grid-cols-1 md:grid-cols-3 items-stretch`.
- 각 패널은 `h-full`을 사용해 동일한 높이 유지.
- Updates/Schedule 패널은 각각 최신 4건만 표시.
- FAQ 패널은 `Q.` 접두사를 붙인 질문 4건 표시.

---

### 4.6 `components/ui/Badge.tsx`

상태(신규/업데이트/수정/긴급)와 일관된 컬러/레이블을 제공한다.

```tsx
const TAG_STYLES = {
  new:    'bg-[#FCEBEB] text-[#A32D2D]',
  update: 'bg-[#E6F1FB] text-[#185FA5]',
  fix:    'bg-[#EAF3DE] text-[#3B6D11]',
  urgent: 'bg-[#FAEEDA] text-[#854F0B]',
} as const

const TAG_LABELS = {
  new: '신규',
  update: '업데이트',
  fix: '수정',
  urgent: '긴급',
} as const

export function Badge({ type }: { type: keyof typeof TAG_STYLES }) {
  return (
    <span className={`text-badge px-2 py-0.5 rounded-full ${TAG_STYLES[type]}`}>
      {TAG_LABELS[type]}
    </span>
  )
}
```

---

### 4.7 `components/ui/DdayBadge.tsx`

D-day 값에 따른 색상/라벨 표시를 담당한다.

```ts
interface DdayBadgeProps {
  dday: number
}
```

- `dday < 0` 는 상위 레벨에서 필터링하므로, 이 컴포넌트는 0 이상만 받는다는 가정으로 구현해도 된다.
- 색상은 `getDdayColor`와 동일 규칙 사용:
  - `dday <= 7`  → `text-[#C8290A]`
  - `dday <= 14` → `text-[#854F0B]`
  - 그 외       → `text-[#3B6D11]`

---

### 4.8 `components/ui/Button.tsx`

Primary / Ghost / Text 버튼 변형을 제공하는 공통 버튼 컴포넌트.

```ts
type ButtonVariant = 'primary' | 'ghost' | 'text'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}
```

**스타일 가이드**

- Primary:
  - `bg-brand text-white rounded-[6px]`
- Ghost:
  - `border border-brand text-brand bg-white rounded-[6px]`
- Text:
  - `bg-transparent text-brand underline-offset-4 hover:underline`

---

### 4.9 `components/home/ShortcutBar.tsx` (F-06)

```txt
배경: bg-[#F8F8F8] border-t border-[#E5E5E5]
구성: 5열 균등 분할 grid-cols-5 (모바일: 1열)
```

```ts
const SHORTCUTS = [
  { icon: 'Monitor',    label: '원격 지원',      desc: '원격으로 빠른 해결',  href: '/remote' },
  { icon: 'Phone',      label: '고객 지원',      desc: '전화·채팅 문의',      href: '/support' },
  { icon: 'FileText',   label: '제품 도입 문의', desc: '신규 도입 상담',      href: '/inquiry' },
  { icon: 'MapPin',     label: 'MiSO 지역센터', desc: '가까운 센터 찾기',    href: '/miso' },
  { icon: 'Pill',       label: '의약품 검색',    desc: '약품 코드 조회',      href: '/medicine' },
]
// 아이콘은 lucide-react에서 import
```

**구현 포인트**

- 레이아웃: `grid grid-cols-1 md:grid-cols-5 gap-0`.
- 각 아이템은 중앙 정렬된 카드 형태이되, 그림자 없이 border/배경만 사용.
- 운영시간 정보는 별도 붉은 박스 대신 Tooltip 또는 `고객 지원` 항목 hover 시 텍스트로 노출.

---

## 5. Mock 데이터 명세

### 5.1 `data/updates.ts`

```ts
export const UPDATES: UpdateItem[] = [
  {
    id: 'u001',
    type: 'new',
    title: 'CRM 문자발송 처방화면 연동',
    version: 'v24.3',
    date: '2025.03.13',
  },
  {
    id: 'u002',
    type: 'update',
    title: '의사랑 수약가 업데이트 11월',
    version: 'v24.2',
    date: '2025.03.10',
  },
  {
    id: 'u003',
    type: 'fix',
    title: 'KT 의료정보 EDI 서비스 오류 수정',
    version: 'v24.1',
    date: '2025.03.05',
  },
  {
    id: 'u004',
    type: 'update',
    title: '의료비 소득공제 자료 자동화',
    version: 'v24.0',
    date: '2025.02.28',
  },
]
```

### 5.2 `data/schedules.ts`

```ts
export const SCHEDULES: ScheduleItem[] = [
  { id: 's001', date: '03.16', title: '4월 수가변경 업데이트 배포', targetDate: '2025-03-16' },
  { id: 's002', date: '03.25', title: '심평원 청구 마감',           targetDate: '2025-03-25' },
  { id: 's003', date: '03.31', title: '의약품 코드 고시 적용일',    targetDate: '2025-03-31' },
  { id: 's004', date: '04.13', title: '의사랑 정기 업데이트 배포', targetDate: '2025-04-13' },
]
```

### 5.3 `data/faqs.ts`

PRD 기준으로 최소 5개 이상의 FAQ를 정의한다. 예시 필드:

```ts
export const FAQS: FaqItem[] = [
  {
    id: 'f001',
    question: '의사랑 업데이트는 어떻게 진행되나요?',
    answer: '정기 업데이트 일정과 방법은 주요 일정 및 제품 업데이트 페이지에서 확인하실 수 있습니다.',
  },
  // ...
]
```

---

## 6. 구현 순서 (Task Order)

Claude Code / Cursor는 아래 순서로 작업한다.  
선행 작업이 필요한 항목(예: Tailwind 설정, dday 유틸 등)을 먼저 완료한 후 컴포넌트 구현을 진행한다.

```txt
Phase 1 — 기반 세팅
  [ ] 1. Next.js 14 프로젝트 초기화 (pnpm create next-app)
  [ ] 2. tailwind.config.ts — 컬러 토큰 등록
  [ ] 3. globals.css — 폰트(Pretendard), 타이포 클래스 정의
  [ ] 4. lib/dday.ts — D-day 계산 유틸 작성
  [ ] 5. data/*.ts — mock 데이터 파일 생성

Phase 2 — 공통 컴포넌트
  [ ] 6.  components/ui/Badge.tsx
  [ ] 7.  components/ui/DdayBadge.tsx
  [ ] 8.  components/ui/Button.tsx
  [ ] 9.  components/layout/AlertBar.tsx
  [ ] 10. components/layout/GNB.tsx
  [ ] 11. components/layout/Footer.tsx

Phase 3 — 홈 섹션 컴포넌트
  [ ] 12. components/home/DdayStrip.tsx
  [ ] 13. components/home/HeroBanner.tsx
  [ ] 14. components/home/UpdatesPanel.tsx
  [ ] 15. components/home/SchedulePanel.tsx
  [ ] 16. components/home/FaqPanel.tsx
  [ ] 17. components/home/ShortcutBar.tsx

Phase 4 — 페이지 조립
  [ ] 18. app/layout.tsx (AlertBar + GNB + Footer 조립)
  [ ] 19. app/page.tsx (홈 섹션 전체 조립)
  [ ] 20. app/updates/page.tsx (제품 업데이트 목록 페이지)
  [ ] 21. app/schedule/page.tsx (주요 일정 페이지)

Phase 5 — 검수
  [ ] 22. 반응형 확인 (모바일 360px, 태블릿 768px, 데스크탑 1280px)
  [ ] 23. D-day 계산 로직 엣지케이스 테스트 (당일 = D-0, 지난 일정 필터)
  [ ] 24. AlertBar 닫기 sessionStorage 동작 확인
  [ ] 25. HeroBanner 자동 슬라이드 + 호버 정지 확인
```

---

## 7. 자주 하는 실수 방지

| 실수 | 방지 방법 |
|------|-----------|
| `shadow-*` 사용 | border로 대체, 그림자 일체 금지 |
| 인라인 hex 컬러 남용 | Tailwind 컬러 토큰 우선 (`text-brand`, `bg-status-danger` 등). 불가피한 경우 컴포넌트 상수로 한 곳에 모아 관리 |
| 슬라이드에 framer-motion 도입 | CSS transition만 사용, 추가 애니메이션 라이브러리 금지 |
| D-day 음수 처리 누락 | `dday < 0` 필터링 로직을 목록 렌더링 이전 단계에서 반드시 적용 |
| GNB sticky 누락 | GNB 컨테이너에 `sticky top-0 z-50` 클래스 필수 |
| 3단 패널 높이 불일치 | 그리드에 `items-stretch`, 각 패널에 `h-full` 적용 |
| 모바일에서 3단 → 1단 미전환 | `grid-cols-1 md:grid-cols-3` / `grid-cols-1 md:grid-cols-5` 패턴 적용 여부 확인 |

---

## 8. 커밋 컨벤션

```txt
feat: 새 기능 추가
fix: 버그 수정
style: 스타일 변경 (기능 변화 없음)
refactor: 리팩토링
chore: 설정, 패키지 변경

예시:
feat: GNB에 제품 업데이트·주요 일정 메뉴 추가
feat: D-day 스트립 컴포넌트 구현
fix: D-day 음수 필터링 누락 수정
style: 히어로 배너 CTA 버튼 간격 조정
```

PRD/CLAUDE 기준으로 의미가 명확히 드러나도록 커밋 메시지를 작성한다.

---

## 9. 완료 기준 (Definition of Done)

- **기능**
  - [ ] PRD의 F-01 ~ F-07 모든 기능 요구사항 구현.
- **UI/UX**
  - [ ] 모바일(360px) / 태블릿(768px) / 데스크탑(1280px) 레이아웃 정상 동작.
  - [ ] Pretendard 폰트가 정상 로드되고 주요 텍스트에 적용됨.
  - [ ] 브랜드 오렌지 `#D44A00` 컬러가 버튼/링크/강조 요소에 일관되게 사용됨.
  - [ ] 그림자(`shadow-*`) 미사용.
- **도메인 로직**
  - [ ] D-day 계산 로직 정확성 확인 (`D-0`, `D-1` 등 경계값 포함).
  - [ ] 지난 일정은 D-day 스트립 및 일정 패널에서 노출되지 않음.
  - [ ] 히어로 배너 슬라이드 4개 이하, 각 슬라이드에 최소 1개 이상의 CTA 버튼 존재.
- **기술 품질**
  - [ ] `npm run build` 에러 없음.
  - [ ] 타입스크립트 빌드 에러 없음.
  - [ ] 주요 페이지에서 콘솔 경고/에러(React key, hydration 등) 없음.

