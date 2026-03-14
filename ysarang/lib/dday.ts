export function calcDday(targetDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function getDdayColor(dday: number): string {
  if (dday <= 7) return 'text-[#C8290A]'
  if (dday <= 14) return 'text-[#854F0B]'
  return 'text-[#3B6D11]'
}

