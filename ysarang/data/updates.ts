export type UpdateType = 'new' | 'update' | 'fix' | 'urgent'

export interface UpdateItem {
  id: string
  type: UpdateType
  title: string
  version: string
  date: string
}

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

