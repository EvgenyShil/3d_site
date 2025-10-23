export default function Prices(){
  return (
    <div className="space-y-6">
      {/* Prices banner */}
      <img
        src="/images/prices/prices-bg.webp"
        alt="Фон прайса с геометрическими фигурами в изумрудно-янтарной гамме."
        className="w-full rounded-2xl border"
      />
      <h1 className="text-2xl font-semibold">Цены</h1>
      {/* 3D-печать section */}
      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">3D-печать</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-1 pr-4">Материал</th>
                <th className="text-left py-1">Цена, ₽/см³</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>PLA</td><td>12</td></tr>
              <tr><td>PETG</td><td>15</td></tr>
              <tr><td>ABS</td><td>16</td></tr>
              <tr><td>TPU</td><td>20</td></tr>
              <tr><td>PA6</td><td>25</td></tr>
              <tr><td>PA12</td><td>28</td></tr>
              <tr><td>PP</td><td>24</td></tr>
              <tr><td>POM</td><td>40</td></tr>
              <tr><td>PPO</td><td>35</td></tr>
              <tr><td>PETG‑CF</td><td>30</td></tr>
              <tr><td>ABS‑CF</td><td>32</td></tr>
              <tr><td>PA‑CF</td><td>40</td></tr>
            </tbody>
          </table>
        </div>
        <div className="text-sm">
          <p className="mt-2">Постобработка (за деталь): шлифовка 150 ₽ · грунт 200 ₽ · покраска 400 ₽ · нарезка резьбы 80 ₽ · латунные втулки 120 ₽</p>
          <p>Срочность: +30%</p>
        </div>
      </section>
      {/* 3D‑моделирование section */}
      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">3D‑моделирование</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Base</strong>: 3 000–8 000 ₽ (простые формы, без сложных допусков)</li>
          <li><strong>Pro</strong>: 10 000–25 000 ₽ (сборки/посадки, проверка на печатность)</li>
          <li><strong>Industrial</strong>: 25 000–60 000 ₽ (NDA, документация, версияция, сопровождение печати)</li>
        </ul>
      </section>
      {/* Чертежи section */}
      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">Чертежи</h2>
        <p className="text-sm">700–1 500 ₽ за лист / 1 500–3 000 ₽/час сложных работ</p>
      </section>
    </div>
  )
}
