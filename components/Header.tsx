import Link from 'next/link';

export default function Header(){
  return (
    <header className="border-b border-zinc-200">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">3D Studio</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/works" className="hover:underline">Примеры работ</Link>
          <Link href="/prices" className="hover:underline">Цены</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/contacts" className="hover:underline">Контакты</Link>
        </nav>
      </div>
    </header>
  )
}
