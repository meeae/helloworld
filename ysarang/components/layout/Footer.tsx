import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-[11px] text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-700">(주)유비케어</span>
          <span>|</span>
          <span>대표자: 홍길동</span>
          <span>|</span>
          <span>사업자등록번호: 000-00-00000</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span>주소: 서울시 OO구 OO로 00, 유비케어빌딩</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/privacy" className="hover:text-brand">
            개인정보 처리방침
          </Link>
          <Link href="/terms" className="hover:text-brand">
            이용약관
          </Link>
        </div>
        <div className="mt-1 text-[10px] text-gray-400">
          © {new Date().getFullYear()} UBcare Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

