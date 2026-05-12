<template>
  <section
    id="schedule"
    ref="sectionRef"
    class="reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center flex flex-col items-center gap-4 mb-16" data-reveal style="--reveal-delay: 80ms">
        <div class="flex items-center gap-3">
          <div class="w-12 h-px bg-brand" />
          <span class="text-brand font-medium text-sm uppercase tracking-widest">Расписание</span>
          <div class="w-12 h-px bg-brand" />
        </div>
        <h2 class="section-title text-balance">
          График <span class="text-brand">тренировок</span>
        </h2>
        <p class="section-subtitle text-center">
          Выберите удобное время для занятий
        </p>
      </div>

      <!-- Day Tabs -->
      <div class="flex justify-center mb-10" data-reveal style="--reveal-delay: 180ms">
        <div class="flex bg-surface-card rounded-lg p-1 border border-white/5 overflow-x-auto">
          <button
            v-for="day in days"
            :key="day.short"
            class="px-4 sm:px-6 py-2.5 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap"
            :class="activeDay === day.short
              ? 'bg-brand text-white shadow-lg shadow-brand/25'
              : 'text-white/50 hover:text-white hover:bg-white/5'"
            @click="activeDay = day.short"
          >
            <span class="hidden sm:inline">{{ day.full }}</span>
            <span class="sm:hidden">{{ day.short }}</span>
          </button>
        </div>
      </div>

      <!-- Schedule Table -->
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col gap-3">
          <div
            v-for="(session, index) in currentSessions"
            :key="session.time"
            class="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-lg bg-surface-card border border-white/5 hover:border-brand/30 transition-colors group"
            data-reveal
            :style="{ '--reveal-delay': `${240 + index * 90}ms` }"
          >
            <!-- Time -->
            <div class="flex-shrink-0 w-20 sm:w-24">
              <span class="font-display text-xl sm:text-2xl font-bold text-white">{{ session.time }}</span>
            </div>

            <!-- Divider -->
            <div class="w-px h-10 bg-white/10 hidden sm:block" />

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-white text-base sm:text-lg truncate">{{ session.title }}</h3>
              <p class="text-white/40 text-sm mt-0.5">{{ session.coach }}</p>
            </div>

            <!-- Tags -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <span
                class="text-xs px-3 py-1.5 rounded-full font-medium"
                :class="levelClass(session.level)"
              >
                {{ session.level }}
              </span>
              <span class="text-white/30 text-xs hidden sm:block">{{ session.duration }}</span>
            </div>
          </div>

          <div
            v-if="currentSessions.length === 0"
            class="text-center py-16 text-white/30"
            data-reveal
            style="--reveal-delay: 240ms"
          >
            <p class="text-lg">В этот день занятий нет</p>
            <p class="text-sm mt-2">Выберите другой день недели</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSectionReveal } from '../composables/useSectionReveal'

const { sectionRef, isVisible } = useSectionReveal()

const activeDay = ref('Пн')

const days = [
  { short: 'Пн', full: 'Понедельник' },
  { short: 'Вт', full: 'Вторник' },
  { short: 'Ср', full: 'Среда' },
  { short: 'Чт', full: 'Четверг' },
  { short: 'Пт', full: 'Пятница' },
  { short: 'Сб', full: 'Суббота' },
  { short: 'Вс', full: 'Воскресенье' },
]

const schedule = {
  'Пн': [
    { time: '09:00', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Дети 9-14 лет', duration: '90 мин' },
    { time: '14:00', title: 'Кикбоксинг', coach: 'Исаков Константин', level: 'Мини группа, взрослые', duration: '90 мин' },
    { time: '16:00', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Сборная', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Подростки', duration: '90 мин' },
    { time: '19:00', title: 'Кикбоксинг', coach: 'Дзидзигури Лаша', level: 'Взрослые', duration: '90 мин' },
  ],
  'Вт': [
    { time: '08:30', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Взрослые', duration: '90 мин' },
    { time: '10:00', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Полубелова Юля', level: 'Дети 6-9 лет', duration: '90 мин' },
    { time: '18:45', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '20:00', title: 'ММА', coach: 'Силин Максим', level: 'Взрослые', duration: '90 мин' },
  ],
  'Ср': [
    { time: '09:00', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Дети 9-14 лет', duration: '90 мин' },
    { time: '14:00', title: 'Кикбоксинг', coach: 'Исаков Константин', level: 'Мини группа, взрослые', duration: '90 мин' },
    { time: '16:00', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Сборная', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Подростки', duration: '90 мин' },
    { time: '19:00', title: 'Кикбоксинг', coach: 'Дзидзигури Лаша', level: 'Взрослые', duration: '90 мин' },
  ],
  'Чт': [
    { time: '08:30', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Взрослые', duration: '90 мин' },
    { time: '10:00', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Полубелова Юля', level: 'Дети 6-9 лет', duration: '90 мин' },
    { time: '18:45', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '20:00', title: 'MMA', coach: 'Силин Максим', level: 'Взрослые', duration: '90 мин' },
  ],
  'Пт': [
    { time: '09:00', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Дети 9-14 лет', duration: '90 мин' },
    { time: '14:00', title: 'Кикбоксинг', coach: 'Исаков Константин', level: 'Мини группа, взрослые', duration: '90 мин' },
    { time: '16:00', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Сборная', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Яковлев Георгий', level: 'Подростки', duration: '90 мин' },
    { time: '19:00', title: 'Кикбоксинг', coach: 'Дзидзигури Лаша', level: 'Взрослые', duration: '90 мин' },
  ],
  'Сб': [
    { time: '08:30', title: 'Кикбоксинг', coach: 'Чернышев Юра', level: 'Взрослые', duration: '90 мин' },
    { time: '10:00', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '17:30', title: 'Кикбоксинг', coach: 'Полубелова Юля', level: 'Дети 6-9 лет', duration: '90 мин' },
    { time: '18:45', title: 'Кикбоксинг', coach: 'Субуханкулова Кристина', level: 'Девушки', duration: '90 мин' },
    { time: '20:00', title: 'MMA', coach: 'Силин Максим', level: 'Взрослые', duration: '90 мин' },
  ],
  'Вс': [],
}

const currentSessions = computed(() => schedule[activeDay.value] || [])

function levelClass(level) {
  switch (level) {
    case 'Начинающие':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    case 'Продвинутые':
      return 'bg-brand/10 text-brand-light border border-brand/20'
    default:
      return 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
  }
}
</script>
