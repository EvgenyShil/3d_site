import { notFound } from 'next/navigation';
import data from '@/data/products.json';
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(()=>import('@/components/ModelViewer'), { ssr:false });

export default function ModelPage({params}:{params:{slug:string}}){
  const p = data.find(x => x.slug === params.slug);
  if (!p) return notFound();
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="card p-4">
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <p className="text-sm text-zinc-600 mt-1">{p.description}</p>
        </div>
        <div className="card p-4">
          <div className="text-sm text-zinc-600">3D-просмотр (загрузите свой STL/OBJ для проверки):</div>
          <ModelViewer />
        </div>
      </div>
      <aside className="space-y-4">
        <div className="card p-4">
          <div className="text-sm">Цена</div>
          <div className="text-2xl font-semibold">{p.price} ₽</div>
          <button className="btn-primary mt-3">Купить файл</button>
          <button className="btn-ghost mt-2">Распечатать у нас</button>
          <div className="mt-3 text-sm">Форматы: {p.formats.join(', ')}</div>
          <div className="text-sm">Лицензия: {p.license_type}</div>
          <div className="text-xs text-zinc-500 mt-2">Версия {p.version}. {p.changelog}</div>
        </div>
      </aside>
    </div>
  )
}

// sync: 2025-10-21
