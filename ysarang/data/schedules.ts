export interface ScheduleItem {
  id: string
  date: string
  title: string
  targetDate: string
}

export const SCHEDULES: ScheduleItem[] = [
  {
    id: 's001',
    date: '03.20',
    title: '4월 수가변경 업데이트 배포',
    targetDate: '2026-03-20',
  },
  {
    id: 's002',
    date: '03.25',
    title: '심평원 청구 마감',
    targetDate: '2026-03-25',
  },
  {
    id: 's003',
    date: '03.31',
    title: '의약품 코드 고시 적용일',
    targetDate: '2026-03-31',
  },
  {
    id: 's004',
    date: '04.13',
    title: '의사랑 정기 업데이트 배포',
    targetDate: '2026-04-13',
  },
  {
    id: 's005',
    date: '04.30',
    title: '요양급여비용 청구 마감',
    targetDate: '2026-04-30',
  },
]
