import Link from 'next/link';
import data from '@/data/products.json';

export default function ModelsPage(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">3D-модели</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(p => (
          <div key={p.slug} className="card p-4">
            <div className="text-sm text-zinc-500">{p.category}</div>
            <div className="font-semibold mt-1">{p.title}</div>
            <div className="text-sm mt-2 line-clamp-2">{p.description}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="font-semibold">{p.price} ₽</div>
              <Link href={`/models/${p.slug}`} className="btn-primary text-sm">Открыть</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// sync: 2025-10-21
