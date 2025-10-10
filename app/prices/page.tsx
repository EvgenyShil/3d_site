export default function Prices(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Цены</h1>
      <div className="card p-4 text-sm">
        <p>Печать: цена зависит от материала, объёма, слоя, постобработки и срочности. На странице печати доступна предоценка.</p>
        <p className="mt-2">Моделирование: пакеты Base / Pro / Industrial — уточняем по брифу.</p>
      </div>
      <div className="card p-4 text-sm">
        <p>Постобработка: шлифовка, грунт/покраска, резьбы, латунные втулки — по прайсу.</p>
      </div>
    </div>
  )
}
