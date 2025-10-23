import Link from 'next/link'
import MaterialCards from '@/components/MaterialCards'

export default function Home(){
  return (
    <div className="space-y-12">
      {/* Hero image */}
      <img
        src="/images/hero/hero-main.webp"
        alt="3D-моделирование и 3D-печать. Печать в термокамере."
        className="w-full rounded-2xl border mb-6"
      />
      <section className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold leading-tight">3D-моделирование и 3D-печать на заказ — от идеи до готового изделия</h1>
          <p className="mt-4 text-zinc-600">Печатаем на принтерах с термокамерой → высокая прочность и повторяемость. Поможем подобрать материал под задачу.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/3d-print" className="btn-primary">Хочу 3D-печать</Link>
            <Link href="/3d-modeling" className="btn-ghost">Нужна 3D-модель</Link>
            <Link href="/models" className="btn-ghost">Купить 3D-модель</Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="card p-6">
            <div className="text-sm text-zinc-600">Быстрый предрасчёт печати</div>
            <p className="mt-2 text-xs text-zinc-500">Загрузите STL на странице печати — система оценит объём и размер.</p>
            <div className="mt-3">
              <Link href="/3d-print" className="btn-primary">Перейти к расчёту</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Материалы</h2>
        <MaterialCards/>
      </section>
    </div>
  )
}
