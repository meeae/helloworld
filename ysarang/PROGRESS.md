# PROGRESS.md — 개발 진행 상세 기록

## 커밋 히스토리 상세

| 커밋 | 날짜 | 변경사항 | 이유 |
|------|------|----------|------|
| feat: 의사랑 홈페이지 UI/UX 개편 베타 | 2026.03.13 | 전체 홈 구조 구현 | PRD 기반 초기 구현 |
| fix: GNB highlight 타입 에러 수정 | 2026.03.13 | NavItem 타입 명시 | Vercel 빌드 에러 해결 |
| fix: GNB NavItem 타입 명시적 선언 | 2026.03.13 | interface 명시 | TypeScript 빌드 오류 수정 |
| fix: tailwind config moduleResolution 수정 | 2026.03.13 | tsconfig bundler 설정 | Vercel 배포 빌드 실패 해결 |
| fix: schedules targetDate 2026년으로 수정 | 2026.03.14 | 날짜 데이터 수정 | 전체 일정이 지난 일정으로 필터링되는 버그 |
| fix: 인라인 hex 토큰화, aria-label 전체 적용 | 2026.03.15 | 디자인 토큰 일관성 | WCAG 접근성 기준 준수 |
| feat: 모바일 햄버거 메뉴 구현 | 2026.03.15 | GNB 모바일 반응형 | 모바일 UX 완성 |

## 주요 의사결정 기록

| 결정 사항 | 이유 | 대안 |
|-----------|------|------|
| Tailwind CSS 토큰 시스템 도입 | 디자인 일관성 및 유지보수성 | 인라인 스타일 |
| postcss.config.cjs 사용 | package.json type:module 환경 충돌 | postcss.config.js |
| mock 데이터 2026년 기준 | 실제 운영 환경 반영 | 하드코딩 날짜 |
| 햄버거 메뉴 lucide-react 아이콘 | 번들 크기 최소화 | 이모지 또는 SVG |

## 미완료 항목 및 개선 계획

| 항목 | 상태 | 개선 계획 |
|------|------|-----------|
| /updates 페이지 | 미구현 | 업데이트 목록 + 필터 기능 |
| /schedule 페이지 | 미구현 | 월별 캘린더 뷰 |
| 실제 사용성 테스트 | 예정 | 간호사/실장 3명 대상 태스크 테스트 |
| 색상 대비 검증 | 예정 | WCAG 2.1 AA 도구 검증 |
