<template>
  <section
    id="contact"
    ref="sectionRef"
    class="reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32 bg-surface-card"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center flex flex-col items-center gap-4 mb-16" data-reveal style="--reveal-delay: 80ms">
        <div class="flex items-center gap-3">
          <div class="w-12 h-px bg-brand" />
          <span class="text-brand font-medium text-sm uppercase tracking-widest">Контакты</span>
          <div class="w-12 h-px bg-brand" />
        </div>
        <h2 class="section-title text-balance">
          Свяжитесь <span class="text-brand">с нами</span>
        </h2>
        <p class="section-subtitle text-center">
          Запишитесь на первое бесплатное занятие или задайте любой вопрос
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Contact Info -->
        <div class="flex flex-col gap-8">
          <div
            v-for="(item, index) in contactInfo"
            :key="item.label"
            class="flex items-start gap-5 p-5 rounded-lg bg-surface border border-white/5 hover:border-brand/20 transition-colors"
            data-reveal
            :style="{ '--reveal-delay': `${180 + index * 100}ms` }"
          >
            <div class="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
              <div v-html="item.icon" class="w-5 h-5 text-brand" />
            </div>
            <div>
              <h3 class="text-white font-semibold text-base">{{ item.label }}</h3>
              <p class="text-white/60 mt-1 text-sm leading-relaxed" v-html="item.value" />
            </div>
          </div>

          <!-- Social links -->
          <div class="flex items-center gap-4 mt-4" data-reveal style="--reveal-delay: 500ms">
            <span class="text-white/40 text-sm">Мы в соцсетях:</span>
            <a
              href="https://max.ru/join/iLYkmECyuLVWNsxwMr-GqfJia6rBbXR9sLVuQl4EMuU"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-all"
              aria-label="MAX"
            >
              <span class="font-semibold text-[10px] tracking-wide">MAX</span>
            </a>
            <a
              href="https://t.me/AkademyKickboxing"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 hover:text-sky-300 hover:border-sky-400/40 transition-all"
              aria-label="Telegram"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href="https://vk.com/akademya_kickboxinga_sochi"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 hover:text-blue-400 hover:border-blue-400/40 transition-all"
              aria-label="VKontakte"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-5" data-reveal style="--reveal-delay: 280ms">
          <div class="grid sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label for="name" class="text-white/60 text-sm font-medium">Ваше имя</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Иван Иванов"
                class="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors text-sm"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="phone" class="text-white/60 text-sm font-medium">Телефон</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                placeholder="+7 (900) 000-00-00"
                class="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors text-sm"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="email" class="text-white/60 text-sm font-medium">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="ivan@example.com"
              class="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors text-sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="group" class="text-white/60 text-sm font-medium">Направление</label>
            <select
              id="group"
              v-model="form.group"
              class="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm appearance-none"
            >
              <option value="" disabled class="text-white/20">Выберите группу</option>
              <option value="kids">Детская группа (6-10 лет)</option>
              <option value="teens">Подростки (11-16 лет)</option>
              <option value="adults">Взрослая группа</option>
              <option value="individual">Персональные тренировки</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label for="message" class="text-white/60 text-sm font-medium">Сообщение</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              placeholder="Расскажите о ваших целях или задайте вопрос..."
              class="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors text-sm resize-none"
            />
          </div>

          <div class="flex flex-col gap-2 rounded-lg border border-white/10 bg-surface/70 p-3 sm:p-4">
            <label
              for="privacy-consent"
              class="flex items-start gap-3 text-xs sm:text-sm text-white/55 leading-relaxed cursor-pointer"
            >
              <input
                id="privacy-consent"
                v-model="form.privacyAccepted"
                type="checkbox"
                required
                class="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 accent-red-500 cursor-pointer shrink-0"
              >
              <span>
                Я согласен(а) на обработку персональных данных и ознакомлен(а) с
                <a
                  href="/privacy"
                  class="text-brand underline underline-offset-4 hover:text-brand-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Политикой в отношении обработки персональных данных
                </a>.
              </span>
            </label>
          </div>

          <p v-if="submitError" class="text-red-400 text-sm mt-1">{{ submitError }}</p>
          <p v-else-if="submitSuccess" class="text-emerald-400 text-sm mt-1">Заявка отправлена!</p>
          <button
            type="submit"
            class="btn-primary w-full justify-center mt-2"
            :class="[
              (submitted || submitSuccess) ? 'bg-emerald-600 hover:bg-emerald-600' : '',
              (submitted || !form.privacyAccepted)
                ? 'opacity-60 cursor-not-allowed hover:bg-brand pointer-events-none'
                : '',
            ]"
            :disabled="submitted || !form.privacyAccepted"
            :aria-disabled="submitted || !form.privacyAccepted"
          >
            {{ submitSuccess ? 'Заявка отправлена!' : submitted ? 'Отправка...' : 'Отправить заявку' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSectionReveal } from '../composables/useSectionReveal'

const { sectionRef, isVisible } = useSectionReveal()

const submitted = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const form = reactive({
  name: '',
  phone: '',
  email: '',
  group: '',
  message: '',
  privacyAccepted: false,
})

const contactInfo = [
  {
    label: 'Адрес',
    value: 'г. Сочи, Транспортная ул., д. 2',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  },
  {
    label: 'Телефон',
    value: '<a href="tel:+79615080000" class="hover:text-brand transition-colors">+7 (961) 508-00-00</a>',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
  {
    label: 'Режим работы',
    value: 'Пн-Сб: 09:00 - 21:00<br/>Вс: выходной',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  },
]

async function handleSubmit() {
  submitError.value = ''

  if (!form.privacyAccepted) {
    submitError.value = 'Подтвердите согласие на обработку персональных данных.'
    return
  }

  submitted.value = true
  try {
    const apiBase = import.meta.env.VITE_TELEGRAM_API_URL || ''
    const res = await fetch(`${apiBase}/api/send-telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        group: form.group,
        message: form.message,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Ошибка отправки')
    }
    form.name = ''
    form.phone = ''
    form.email = ''
    form.group = ''
    form.message = ''
    form.privacyAccepted = false
    submitSuccess.value = true
    setTimeout(() => { submitSuccess.value = false }, 3000)
  } catch (e) {
    submitError.value = e.message || 'Не удалось отправить. Попробуйте позже или напишите нам в мессенджер.'
  } finally {
    submitted.value = false
  }
}
</script>
