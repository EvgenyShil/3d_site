import ContactForm from '@/components/ContactForm'

const services = [
  {
    title: '3D печать деталей',
    description:
      'Печатаю по образцу, фото, чертежу или вашей 3D-модели. Корпуса, крепления, автозапчасти, фигурки и технические детали. Возможна крупногабаритная печать по частям с последующей сборкой.'
  },
  {
    title: 'Материалы под задачу',
    description:
      'Подбираю пластики: ABS, PETG, PLA, TPU, нейлон (PA6/PA12), PP, POM, PPO и композиты (карбон/стекловолокно). Печать на принтерах с активной термокамерой для высокой прочности.'
  },
  {
    title: '3D моделирование и реверс-инжиниринг',
    description:
      'Создаю модели деталей, корпусов, шестерёнок, креплений и авторских изделий по идее, фото или чертежу. Готовлю файлы для печати в нужных форматах. SolidWorks, Компас 3D, Fusion 360, Inventor, Rhino, Plasticity, Blender.'
  },
  {
    title: '3D сканирование и сопровождение',
    description:
      'Точное сканирование образцов для повторения или доработки, помощь на всех этапах и разработка решений по вашим идеям.'
  }
]

export default function Home(){
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">3D-услуги</p>
          <h1 className="text-4xl font-bold leading-tight">
            3D печать, 3D моделирование и 3D сканирование на заказ
          </h1>
          <p className="text-lg text-zinc-600">
            ⚙️ 3D печaть и 3D моделирoвание любой сложноcти на зaказ — от идеи дo гoтового изделия.
          </p>
          <ul className="space-y-2 text-base text-zinc-700">
            <li>• 3D печать деталей по образцу, фото, чертежу или 3D-модели</li>
            <li>• 3D моделирование и реверс-инжиниринг</li>
            <li>• 3D сканирование деталей и изделий</li>
            <li>• Помощь с подбором материалов</li>
          </ul>
          <p className="font-medium text-zinc-800">
            Бесплатная консультация — подсказки по материалам, формату файлов и способу производства.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://t.me/evgenyssh" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Написать в Telegram
            </a>
            <a href="#contact-form" className="btn-ghost">
              Заполнить форму заявки
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/hero/hero-main.webp"
            alt="3D печать и моделирование"
            className="w-full max-w-xl rounded-2xl border"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Услуги</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="card space-y-3 p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-zinc-600">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
          <p>✅ Опыт работы и внимательный подход.</p>
          <p>✅ Выполняю заказы аккуратно и в срок.</p>
          <p>✅ Возможна отправка по России.</p>
          <p>✅ Работаю официально как самозанятый (чек через ФНС «Мой налог»).</p>
        </div>
      </section>

      <section className="card flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">портфолио</p>
          <h2 className="text-2xl font-semibold">Примеры выполненных работ</h2>
          <p className="text-zinc-600">
            Посмотрите подборку реализованных проектов по 3D-печати, моделированию и подготовке изделий к производству.
          </p>
        </div>
        <a href="/works" className="btn-primary text-center">Смотреть примеры</a>
      </section>

      <section id="contact-form" className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold">Оставить заявку</h2>
          <p className="text-zinc-600">
            Заполните короткую форму — я отвечу в Telegram, помогу с выбором материалов, сроками и стоимостью.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card p-6">
            <ContactForm />
          </div>
          <div className="space-y-4 text-lg text-zinc-700">
            <p>
              После отправки формы откроется Telegram с подготовленным текстом. Я уточню детали, предложу варианты
              производства и помогу с расчётом.
            </p>
            <p>Или напишите мне напрямую в Telegram: {' '}
              <a
                href="https://t.me/evgenyssh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                @evgenyssh
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
