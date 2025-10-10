'use client';
import { useCallback, useState } from 'react';

type Props = {
  onFile: (file: File) => void;
  accept?: string;
};

export default function FileDrop({onFile, accept=''}:Props){
  const [highlight, setHighlight] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setHighlight(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={e=>{e.preventDefault(); setHighlight(true);}}
      onDragLeave={()=>setHighlight(false)}
      onDrop={onDrop}
      className={`card p-6 text-center ${highlight?'border-emerald-400 ring-2 ring-emerald-100':''}`}
    >
      <div className="text-sm text-zinc-600">Перетащите STL/OBJ сюда или выберите файл</div>
      <input type="file" accept={accept} onChange={onChange} className="mt-3" />
    </div>
  )
}
