'use client';
import { MATERIALS } from '@/data/materials';

export default function MaterialCards(){
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MATERIALS.map(m => (
        <div key={m.code} className="card p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{m.name}</div>
            <div className="badge">{m.ratePerCm3} ₽/см³</div>
          </div>
          <p className="mt-2 text-sm">{m.description}</p>
          <p className="mt-2 text-xs text-zinc-500">Когда выбирать: {m.whenToUse}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.attributes.map(a => <span key={a} className="badge">{a}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}
