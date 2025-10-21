import { FAQ } from '@/data/faq';

export default function FAQPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">FAQ</h1>
      <div className="space-y-3">
        {FAQ.map((i, idx) => (
          <details key={idx} className="card p-4">
            <summary className="font-medium cursor-pointer">{i.q}</summary>
            <p className="text-sm text-zinc-600 mt-2">{i.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

// sync: 2025-10-21
