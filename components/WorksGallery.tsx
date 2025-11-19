import Image from "next/image";
import { works } from "@/data/works";

export function WorksGallery() {
  return (
    <section id="works" className="space-y-6 mt-12">
      <h2 className="text-2xl font-semibold">Примеры выполненных работ</h2>
      <p className="text-sm text-zinc-500">
        Часть проектов по 3D-печати, моделированию и подготовке изделий к производству.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work) => (
          <article key={work.id} className="card overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-medium">{work.title}</h3>
              <p className="text-sm text-zinc-500">{work.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
