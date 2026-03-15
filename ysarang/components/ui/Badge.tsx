export type BadgeType = 'new' | 'update' | 'fix' | 'urgent'

const TAG_STYLES: Record<BadgeType, string> = {
  new: 'bg-[#FCEBEB] text-[#A32D2D]',
  update: 'bg-[#E6F1FB] text-[#185FA5]',
  fix: 'bg-[#EAF3DE] text-[#3B6D11]',
  urgent: 'bg-[#FAEEDA] text-[#854F0B]',
}

const TAG_LABELS: Record<BadgeType, string> = {
  new: '신규',
  update: '업데이트',
  fix: '수정',
  urgent: '긴급',
}

interface BadgeProps {
  type: BadgeType
}

export function Badge({ type }: BadgeProps) {
  return (
    <span className={`text-badge px-2 py-0.5 rounded-full ${TAG_STYLES[type]}`}>
      {TAG_LABELS[type]}
    </span>
  )
}

