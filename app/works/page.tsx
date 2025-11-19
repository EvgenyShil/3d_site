import { WorksGallery } from '@/components/WorksGallery'

export default function WorksPage(){
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">портфолио</p>
        <h1 className="text-3xl font-semibold">Примеры выполненных работ</h1>
        <p className="text-zinc-600">
          Подборка проектов по 3D-печати, моделированию и подготовке изделий к производству.
          Каждый пример — это задача клиента и подобранное под неё решение.
        </p>
      </div>

      <WorksGallery />
    </div>
  )
}
