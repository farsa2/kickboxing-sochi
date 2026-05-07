<template>
  <section
    id="pricing"
    ref="sectionRef"
    class="reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32 bg-surface-card"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center flex flex-col items-center gap-4 mb-16" data-reveal style="--reveal-delay: 80ms">
        <div class="flex items-center gap-3">
          <div class="w-12 h-px bg-brand" />
          <span class="text-brand font-medium text-sm uppercase tracking-widest">Абонементы</span>
          <div class="w-12 h-px bg-brand" />
        </div>
        <h2 class="section-title text-balance">
          Выберите <span class="text-brand">свой план</span>
        </h2>
        <p class="section-subtitle text-center">
          Гибкие тарифы для любых целей -- от пробного занятия до безлимита
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <div
          v-for="(plan, index) in plans"
          :key="plan.name"
          class="relative flex flex-col rounded-lg border overflow-hidden transition-all duration-300"
          :class="plan.featured
            ? 'bg-surface border-brand/50 shadow-xl shadow-brand/10 scale-[1.02] lg:scale-105'
            : 'bg-surface border-white/5 hover:border-white/10'"
          data-reveal
          :style="{ '--reveal-delay': `${180 + index * 100}ms` }"
        >
          <!-- Featured badge -->
          <div
            v-if="plan.featured"
            class="bg-brand text-white text-xs font-bold uppercase tracking-widest text-center py-2"
          >
            Популярный выбор
          </div>

          <div class="p-8 flex flex-col flex-1">
            <h3 class="font-display text-xl font-bold uppercase text-white">{{ plan.name }}</h3>
            <p class="text-white/40 text-sm mt-2">{{ plan.description }}</p>

            <!-- Price -->
            <div class="mt-6 mb-8">
              <div class="flex items-baseline gap-1">
                <span class="font-display text-5xl font-bold" :class="plan.featured ? 'text-brand' : 'text-white'">
                  {{ plan.price }}
                </span>
                <span class="text-white/40 text-lg">{{"₽"}}</span>
              </div>
              <span class="text-white/30 text-sm">{{ plan.period }}</span>
            </div>

            <!-- Features -->
            <ul class="flex flex-col gap-3 flex-1 mb-8">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-3 text-sm"
              >
                <svg class="w-4 h-4 flex-shrink-0" :class="plan.featured ? 'text-brand' : 'text-white/40'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-white/70">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <a
              href="#contact"
              class="w-full text-center py-3.5 rounded font-semibold transition-all duration-300"
              :class="plan.featured
                ? 'bg-brand text-white hover:bg-brand-light hover:shadow-lg hover:shadow-brand/25'
                : 'bg-white/5 text-white border border-white/10 hover:border-brand hover:text-brand'"
            >
              Выбрать
            </a>
          </div>
        </div>
      </div>

      <!-- Note -->
      <p class="text-center text-white/30 text-sm mt-10" data-reveal style="--reveal-delay: 520ms">
        Первое пробное занятие -- бесплатно. Для оформления абонемента обратитесь к администратору.
      </p>
    </div>
  </section>
</template>

<script setup>
import { useSectionReveal } from '../composables/useSectionReveal'

const { sectionRef, isVisible } = useSectionReveal()

const plans = [
  {
    name: 'Разовые и персональные',
    description: 'Для тех, кто хочет попробовать тренировки или заниматься по гибкому графику',
    price: '500',
    period: 'за групповое занятие',
    featured: false,
    features: [
      '500 ₽ — утро, детские группы',
      '800 ₽ — взрослые группы',
      '1 000 ₽ — мини-группы',
      '3 000 ₽ — персональная тренировка',
    ],
  },
  {
    name: 'Абонементы',
    description: 'Выгодные пакеты посещений для регулярных тренировок',
    price: '4 000',
    period: 'от / за абонемент',
    featured: true,
    features: [
      '4 000 ₽ — 8 посещений',
      '6 000 ₽ — 12 посещений',
      '8 000 ₽ — мини-группы',
      '10 000 ₽ — семейный 1+1',
      '10 000 ₽ — безлимитный',
    ],
  },
  {
    name: 'Годовые абонементы',
    description: 'Максимальная выгода для тех, кто тренируется круглый год',
    price: '18 000',
    period: 'от / 3 месяца',
    featured: false,
    features: [
      '18 000 ₽ — 3 месяца, скидка 10% или 1 персональная тренировка',
      '36 000 ₽ — 6 месяцев, скидка 10% или 3 персональные тренировки',
      '72 000 ₽ — 12 месяцев, скидка 10% или 5 персональных тренировок',
    ],
  },
]
</script>
