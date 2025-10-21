export default function Footer(){
  return (
    <footer className="border-t border-zinc-200 mt-16">
      <div className="container py-8 text-sm text-zinc-600">
        <div>© {new Date().getFullYear()} 3D Studio. Все права защищены.</div>
        <div className="mt-2">Печать на принтерах с термокамерой. Отправка по РФ. NDA по запросу.</div>
      </div>
    </footer>
  )
}

// sync: 2025-10-21
