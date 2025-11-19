'use client'

import { FormEvent, useState } from 'react'

const TELEGRAM_URL = 'https://t.me/your_dog_is_happy'

const services = [
  '3D печать деталей',
  '3D моделирование / реверс-инжиниринг',
  '3D сканирование',
  'Не знаю, нужна консультация'
]

export default function ContactForm(){
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: services[0],
    details: ''
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = `Новая заявка с сайта (3D-услуги):\n\nИмя: ${formData.name}\nКонтакт: ${formData.contact}\nУслуги: ${formData.service}\nОписание задачи:\n${formData.details}`
    const text = encodeURIComponent(message)
    window.open(`${TELEGRAM_URL}?text=${text}`, '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700">Имя*</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="input"
          placeholder="Например, Евгений"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Как с вами связаться*</label>
        <input
          type="text"
          required
          value={formData.contact}
          onChange={(e) => setFormData({...formData, contact: e.target.value})}
          className="input"
          placeholder="@nickname, телефон или почта"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Что вам нужно*</label>
        <select
          className="input"
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
        >
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Кратко опишите задачу</label>
        <textarea
          rows={4}
          value={formData.details}
          onChange={(e) => setFormData({...formData, details: e.target.value})}
          className="input"
          placeholder="Что нужно сделать, сроки, материалы"
        />
      </div>
      <button type="submit" className="btn-primary w-full">Отправить в Telegram</button>
    </form>
  )
}
