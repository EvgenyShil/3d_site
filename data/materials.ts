export type MaterialCode = 'PLA'|'PETG'|'ABS'|'TPU'|'PA6'|'PA12'|'PP'|'POM'|'PPO'|'PETG_CF'|'ABS_CF'|'PA_CF';

export interface MaterialInfo {
  code: MaterialCode;
  name: string;
  description: string;
  whenToUse: string;
  ratePerCm3: number; // руб/см3 — ориентир
  attributes: string[]; // теги: прочность/гибкость/термостойкость/химстойкость
}

export const MATERIALS: MaterialInfo[] = [
  { code:'PLA', name:'PLA', description:'Максимально просто и красиво. Макеты, сувениры, корпуса без нагрузок.',
    whenToUse:'Когда важна визуалка и простота, без высоких температур и нагрузок.',
    ratePerCm3: 12, attributes:['детализация','легкая печать'] },
  { code:'PETG', name:'PETG', description:'Универсальный и стойкий. Бытовые детали, корпуса, умеренная теплостойкость.',
    whenToUse:'Хорош для наружных кронштейнов, контейнеров, прототипов.',
    ratePerCm3: 15, attributes:['прочность','умеренная термостойкость'] },
  { code:'ABS', name:'ABS', description:'Функциональные детали и корпуса. Термостойкость, ударность.',
    whenToUse:'Защёлки/клипсы, корпусные детали. Термокамера повышает стабильность.',
    ratePerCm3: 16, attributes:['термостойкость','ударная вязкость'] },
  { code:'TPU', name:'TPU', description:'Гибкость и демпфирование. Прокладки, бамперы, ножки, антискользящие.',
    whenToUse:'Нужна гибкость и эластичность.',
    ratePerCm3: 20, attributes:['эластичность'] },
  { code:'PA6', name:'PA6 (Нейлон)', description:'Механика: износостойкость, скольжение, высокая ударная вязкость.',
    whenToUse:'Шестерни, шарниры, крепкие функциональные узлы.',
    ratePerCm3: 25, attributes:['износостойкость','прочность'] },
  { code:'PA12', name:'PA12 (Нейлон)', description:'Стабильность и меньшая влагочувствительность (при сушке).',
    whenToUse:'Стабильные функциональные детали и оснастка.',
    ratePerCm3: 28, attributes:['износостойкость','стабильность'] },
  { code:'PP', name:'PP', description:'Эластичная химстойкость. Петельки-шарниры, агрессивные среды.',
    whenToUse:'Контейнеры, детали для химии, живые шарниры.',
    ratePerCm3: 24, attributes:['химстойкость','эластичность'] },
  { code:'POM', name:'POM', description:'Низкое трение, точность. Втулки, направляющие, механизмы.',
    whenToUse:'Когда нужно низкое трение и точность (по согласованию).',
    ratePerCm3: 40, attributes:['низкое трение','точность'] },
  { code:'PPO', name:'PPO', description:'Термостабильность и размерная точность.',
    whenToUse:'Корпуса и детали с жёсткими требованиями к геометрии и теплостойкости.',
    ratePerCm3: 35, attributes:['термостойкость','стабильность'] },
  { code:'PETG_CF', name:'PETG-CF', description:'Жёсткость и меньшая ползучесть за счёт углеволокна.',
    whenToUse:'Кронштейны, оснастка, несущие элементы.',
    ratePerCm3: 30, attributes:['жёсткость'] },
  { code:'ABS_CF', name:'ABS-CF', description:'Жёстче и стабильнее ABS, повышенная теплостойкость.',
    whenToUse:'Функциональные детали, которые должны держать форму.',
    ratePerCm3: 32, attributes:['жёсткость','термостойкость'] },
  { code:'PA_CF', name:'PA-CF', description:'Серьёзная механика: высокая жёсткость и прочность.',
    whenToUse:'Оснастка, дроны, кронштейны, мех. узлы.',
    ratePerCm3: 40, attributes:['жёсткость','прочность'] },
];

export const MATERIAL_LOOKUP = Object.fromEntries(MATERIALS.map(m => [m.code, m]));

// sync: 2025-10-21
