'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AlertBarProps {
  type: 'danger' | 'warning' | 'info'
  message: string
  linkText?: string
  linkHref?: string
}

const STORAGE_KEY = 'ys-alertbar-dismissed'

const TYPE_CLASSES: Record<AlertBarProps['type'], string> = {
  danger: 'bg-[#C8290A] text-white',
  warning: 'bg-[#854F0B] text-white',
  info: 'bg-[#185FA5] text-white',
}

export function AlertBar({ type, message, linkText, linkHref }: AlertBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
    }
    setVisible(false)
  }

  return (
    <div className={`h-9 flex items-center justify-between px-4 text-xs ${TYPE_CLASSES[type]}`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        {linkText && linkHref && (
          <Link href={linkHref} className="underline underline-offset-4">
            {linkText}
          </Link>
        )}
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="ml-4 text-xs opacity-80 hover:opacity-100"
        aria-label="공지 닫기"
      >
        ×
      </button>
    </div>
  )
}

