# 3D MVP Site (Next.js + Tailwind + three.js)

Готовый каркас MVP: 3D-печать, 3D-моделирование, продажа 3D-моделей.

## Быстрый старт
```bash
npm i
npm run dev
```
Открой `http://localhost:3000`

## Деплой на Vercel
1. Создай новый репозиторий на GitHub и залей этот проект.
2. В Vercel: New Project → импортируй репозиторий.
3. В Project Settings → Environment Variables добавь переменные из `.env.example` (по необходимости).
4. Deploy.

## Что внутри
- Next.js 14 (App Router), TypeScript
- Tailwind CSS
- three.js STL/OBJ 3D-viewer
- Страницы: главная, 3D-печать, 3D-моделирование, модели, кейсы, цены, FAQ, контакты
- API-роуты (заглушки) для загрузки файлов, расчёта, заявок и чекаута
- Демо-данные для моделей/FAQ/материалов

> Важно: API-роуты с оплатой и хранилищем — заготовки. Включи YooKassa/Stripe и @vercel/blob по своим ключам.

_Sync marker: 2025-10-21_
