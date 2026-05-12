<template>
  <section
    id="about"
    ref="sectionRef"
    class="about-section reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32"
    :class="{ 'about-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Image side -->
        <div class="relative about-media-wrap">
          <div class="relative rounded-lg overflow-hidden about-media-shell">
            <video
              v-if="shouldLoadVideo"
              autoplay
              loop
              muted
              playsinline
              preload="none"
              poster="/images/about.jpg"
              class="w-full aspect-[4/3] object-cover about-media"
            >
              <source src="/videos/about-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
              <source src="/videos/about.mp4" type="video/mp4" />
            </video>
            <img
              v-else
              src="/images/about.jpg"
              alt="Зал Академии Кикбоксинга"
              loading="lazy"
              decoding="async"
              class="w-full aspect-[4/3] object-cover about-media"
            />
          </div>
          <!-- Accent block -->
          <div class="absolute -bottom-6 -right-6 bg-brand rounded-lg p-6 hidden lg:block shadow-xl shadow-brand/20">
            <div class="font-display text-4xl font-bold text-white">10+</div>
            <div class="text-white/80 text-sm font-medium">лет работы</div>
          </div>
        </div>

        <!-- Text side -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3 about-badge">
            <div class="w-12 h-px bg-brand" />
            <span class="text-brand font-medium text-sm uppercase tracking-widest">О нас</span>
          </div>

          <h2 class="section-title text-balance about-title" aria-label="МЫ ГОТОВИМ ЧЕМПИОНОВ">
            <span class="about-title-line">
              <span class="about-title-text">МЫ ГОТОВИМ</span>
            </span>
            <span class="about-title-line">
              <span class="about-title-text about-title-accent text-brand">ЧЕМПИОНОВ</span>
            </span>
          </h2>

          <p class="text-white/60 text-lg leading-relaxed about-description">
            Академия Кикбоксинга Сочи -- это профессиональная школа единоборств,
            объединяющая опытных тренеров и современные методики подготовки.
            Мы работаем как с начинающими, так и с опытными спортсменами,
            стремящимися к высоким результатам.
          </p>

          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <div
              v-for="(feature, index) in features"
              :key="feature.title"
              class="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-white/5 about-feature-card"
              :style="{ '--stagger-index': index }"
            >
              <div class="w-10 h-10 rounded bg-brand/10 flex items-center justify-center flex-shrink-0">
                <component :is="feature.icon" class="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 class="font-semibold text-white text-sm">{{ feature.title }}</h3>
                <p class="text-white/50 text-sm mt-1">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, onMounted, onUnmounted, ref } from 'vue'
import { useSectionReveal } from '../composables/useSectionReveal'

const { sectionRef, isVisible } = useSectionReveal({
  threshold: 0.12,
  rootMargin: '0px 0px -4% 0px',
})
const shouldLoadVideo = ref(true)
let mediaObserver = null

const IconShield = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
    ])
  }
}

const IconTarget = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('circle', { cx: '12', cy: '12', r: '6' }),
      h('circle', { cx: '12', cy: '12', r: '2' })
    ])
  }
}

const IconUsers = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '9', cy: '7', r: '4' }),
      h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
      h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
    ])
  }
}

const IconTrophy = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
      h('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }),
      h('path', { d: 'M4 22h16' }),
      h('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22' }),
      h('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22' }),
      h('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' })
    ])
  }
}

const features = [
  { title: 'Профессиональные тренеры', desc: 'Мастера спорта с международным опытом', icon: IconShield },
  { title: 'Индивидуальный подход', desc: 'Программы для любого уровня подготовки', icon: IconTarget },
  { title: 'Детские группы', desc: 'Занятия для детей от 6 лет', icon: IconUsers },
  { title: 'Соревнования', desc: 'Регулярное участие в турнирах', icon: IconTrophy },
]

onMounted(() => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (!isMobile) return

  shouldLoadVideo.value = false

  mediaObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    shouldLoadVideo.value = true
    mediaObserver?.disconnect()
    mediaObserver = null
  }, {
    threshold: 0.01,
    rootMargin: '220px 0px',
  })

  if (sectionRef.value) {
    mediaObserver.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  mediaObserver?.disconnect()
  mediaObserver = null
})

</script>

<style scoped>
.about-section {
  --premium-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

.about-media-wrap {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 800ms var(--premium-ease),
    transform 800ms var(--premium-ease);
}

.about-media-shell {
  transform: scale(1);
  transition: transform 1400ms var(--premium-ease);
}

.about-badge {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
  transition:
    opacity 700ms var(--premium-ease) 120ms,
    transform 700ms var(--premium-ease) 120ms;
}

.about-title-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}

.about-title-text {
  display: inline-block;
  opacity: 0;
  transform: translateY(115%);
  transition:
    opacity 760ms var(--premium-ease),
    transform 900ms var(--premium-ease);
  will-change: transform, opacity;
}

.about-title-accent {
  text-shadow: 0 0 0 rgba(225, 29, 72, 0);
}

.about-description {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms var(--premium-ease),
    transform 760ms var(--premium-ease);
}

.about-feature-card {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 680ms var(--premium-ease),
    transform 680ms var(--premium-ease);
}

.about-visible .about-media-wrap {
  opacity: 1;
  transform: translateY(0);
}

.about-visible .about-media-shell {
  transform: scale(1.05);
}

.about-visible .about-badge {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.about-visible .about-title-line:nth-child(1) .about-title-text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 280ms;
}

.about-visible .about-title-line:nth-child(2) .about-title-text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 460ms;
}

.about-visible .about-title-accent {
  text-shadow: 0 0 20px rgba(225, 29, 72, 0.24);
}

.about-visible .about-description {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 700ms;
}

.about-visible .about-feature-card {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(900ms + (var(--stagger-index) * 100ms));
}

@media (max-width: 768px) {
  .about-media-wrap,
  .about-description,
  .about-feature-card {
    transform: translateY(12px);
  }

  .about-visible .about-media-shell {
    transform: scale(1.02);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-media-wrap,
  .about-media-shell,
  .about-badge,
  .about-title-text,
  .about-description,
  .about-feature-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    text-shadow: none !important;
  }
}
</style>
