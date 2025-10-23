'use client';
import { useState } from 'react';

export default function ModelingPage(){
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    files.forEach(f => fd.append('files', f));
    const res = await fetch('/api/modeling/submit', { method: 'POST', body: fd });
    setLoading(false);
    if (res.ok){
      const data = await res.json();
      alert('Бриф отправлен: #' + data.id);
      (e.target as HTMLFormElement).reset();
      setFiles([]);
    }else{
      alert('Ошибка отправки');
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner for 3D modeling page */}
      <img
        src="/images/banners/modeling-banner.webp"
        alt="CAD-модель технической детали — 3D-моделирование"
        className="w-full rounded-2xl border"
      />
      <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <form className="card p-4 space-y-3" onSubmit={onSubmit}>
          <div>
            <div className="label">Назначение изделия</div>
            <input name="purpose" className="input" placeholder="Что нужно сделать и зачем" required />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><div className="label">Габариты X, мм</div><input name="dimX" className="input" type="number"/></div>
            <div><div className="label">Y, мм</div><input name="dimY" className="input" type="number"/></div>
            <div><div className="label">Z, мм</div><input name="dimZ" className="input" type="number"/></div>
          </div>
          <div>
            <div className="label">Требования/допуски</div>
            <input name="tolerances" className="input" placeholder="Посадки, точность, особые условия"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">Целевая печать</div>
              <select name="targetPrint" className="input">
                <option value="FDM">FDM</option>
                <option value="SLA">SLA</option>
                <option value="N/A">Не знаю</option>
              </select>
            </div>
            <div>
              <div className="label">Подсказать материал?</div>
              <select name="materialHint" className="input">
                <option>Да, подберите</option>
                <option>Укажу сам</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><div className="label">Бюджет, ₽</div><input name="budget" className="input" type="number"/></div>
            <div><div className="label">Срок, дней</div><input name="deadline" className="input" type="number"/></div>
          </div>
          <div>
            <div className="label">Лицензия</div>
            <select name="license" className="input">
              <option>Эксклюзивная</option>
              <option>Неэксклюзивная</option>
            </select>
          </div>
          <div>
            <div className="label">Файлы-референсы</div>
            <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files||[]))} />
          </div>
          <button className="btn-primary" disabled={loading}>{loading?'Отправляем…':'Отправить бриф'}</button>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card p-4">
          <h3 className="font-semibold">Что делаем</h3>
          <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
            <li>Технические детали, корпуса, оснастка</li>
            <li>Авторские изделия, учебные модели</li>
            <li>Молды (в т.ч. для пластизола), фингерборды</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Процесс</h3>
          <ol className="list-decimal ml-5 text-sm mt-2 space-y-1">
            <li>Бриф</li><li>Оценка и план</li><li>Эскиз/итерации</li><li>Финал и исходники</li>
          </ol>
        </div>
      </aside>
      </div>
    </div>
  )
}
