'use client';
import { useState } from 'react';
import FileDrop from '@/components/FileDrop';
import ModelViewer from '@/components/ModelViewer';
import { estimatePrice } from '@/lib/pricing';
import type { MaterialCode } from '@/data/materials';
import { MATERIALS } from '@/data/materials';

export default function PrintPage(){
  const [file, setFile] = useState<File|undefined>();
  const [dims, setDims] = useState<{x:number,y:number,z:number}|null>(null);
  const [volumeCm3, setVolume] = useState<number|null>(null);
  const [params, setParams] = useState({
    material: 'PETG' as MaterialCode,
    layerMm: 0.2,
    infillPct: 30,
    qty: 1,
    urgency: false,
    postprocess: [] as string[]
  });
  const [quote, setQuote] = useState<{unit:number,total:number}|null>(null);
  const analyze = (info: any) => {
    setDims(info.dims);
    setVolume(info.volumeCm3);
  };

  const onQuote = () => {
    if (volumeCm3 == null) return;
    const q = estimatePrice({ volumeCm3, ...params });
    setQuote(q);
  };

  const submit = async () => {
    if (!file) return alert('Загрузите файл');
    const form = new FormData();
    form.append('file', file);
    form.append('payload', JSON.stringify({ dims, volumeCm3, params }));
    const res = await fetch('/api/print/submit', { method:'POST', body: form });
    if (res.ok){
      const data = await res.json();
      alert('Заявка отправлена: #' + data.id);
    }else{
      alert('Ошибка отправки');
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner for 3D printing page */}
      <img
        src="/images/banners/print-banner.webp"
        alt="3D-принтер с термокамерой и катушки пластика"
        className="w-full rounded-2xl border"
      />
      <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <FileDrop onFile={setFile} accept=".stl,.obj" />
        {file && <ModelViewer file={file} onAnalyzed={analyze} />}
        {dims && (
          <div className="card p-4 text-sm">
            <div>Габариты (единицы модели): {dims.x.toFixed(1)} × {dims.y.toFixed(1)} × {dims.z.toFixed(1)}</div>
            {volumeCm3!=null && <div className="mt-1">Оценочный объём: {volumeCm3.toFixed(2)} см³</div>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="card p-4 space-y-3">
          <div>
            <div className="label">Материал</div>
            <select className="input" value={params.material} onChange={e=>setParams(p=>({...p, material: e.target.value as MaterialCode}))}>
              {MATERIALS.map(m=> <option key={m.code} value={m.code}>{m.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">Слой, мм</div>
              <input type="number" step="0.04" className="input" value={params.layerMm} onChange={e=>setParams(p=>({...p, layerMm: parseFloat(e.target.value)}))}/>
            </div>
            <div>
              <div className="label">Заполнение, %</div>
              <input type="number" className="input" value={params.infillPct} onChange={e=>setParams(p=>({...p, infillPct: parseInt(e.target.value)}))}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">Тираж, шт</div>
              <input type="number" className="input" value={params.qty} onChange={e=>setParams(p=>({...p, qty: parseInt(e.target.value)}))}/>
            </div>
            <div className="flex items-end gap-2">
              <input id="urgent" type="checkbox" checked={params.urgency} onChange={e=>setParams(p=>({...p, urgency: e.target.checked}))}/>
              <label htmlFor="urgent" className="label">Срочно</label>
            </div>
          </div>

          <div>
            <div className="label">Постобработка</div>
            <div className="flex flex-wrap gap-2 text-sm">
              {['sanding','primer','paint','threads','brass_inserts'].map(k => (
                <label key={k} className="badge cursor-pointer">
                  <input type="checkbox" className="mr-1"
                    checked={params.postprocess.includes(k)}
                    onChange={e=>setParams(p=>({...p, postprocess: e.target.checked ? [...p.postprocess, k] : p.postprocess.filter(x=>x!==k)}))}
                  /> {k}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-primary" onClick={onQuote} disabled={volumeCm3==null}>Рассчитать</button>
            <button className="btn-ghost" onClick={submit}>Отправить заявку</button>
          </div>

          {quote && <div className="text-sm text-zinc-700">Оценка: {quote.unit} ₽/шт · Итого: {quote.total} ₽</div>}
        </div>

        <div className="card p-4">
          <h3 className="font-semibold">Оборудование</h3>
          <p className="text-sm text-zinc-600 mt-1">Печатаем на принтерах с термокамерой → высокая прочность межслойной адгезии и стабильная геометрия, меньше коробления.</p>
        </div>
      </div>
    </div>
  )
}
