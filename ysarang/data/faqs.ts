export interface FaqItem {
  id: string
  question: string
  href: string
}

export const FAQS: FaqItem[] = [
  {
    id: 'f001',
    question: '의사랑 업데이트는 어떻게 진행되나요?',
    href: '/support/faq/f001',
  },
  {
    id: 'f002',
    question: '심평원 청구 마감일은 어디에서 확인할 수 있나요?',
    href: '/support/faq/f002',
  },
  {
    id: 'f003',
    question: '원격 지원을 받으려면 어떻게 해야 하나요?',
    href: '/support/faq/f003',
  },
  {
    id: 'f004',
    question: '의사랑 도입 상담은 어디로 문의하면 되나요?',
    href: '/support/faq/f004',
  },
]
