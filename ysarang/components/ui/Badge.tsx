export type BadgeType = 'new' | 'update' | 'fix' | 'urgent'

const TAG_STYLES: Record<BadgeType, string> = {
  new: 'bg-tag-new-light text-tag-new',
  update: 'bg-tag-update-light text-tag-update',
  fix: 'bg-tag-fix-light text-tag-fix',
  urgent: 'bg-tag-urgent-light text-tag-urgent',
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

