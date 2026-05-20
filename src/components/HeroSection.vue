<template>
  <section id="hero" class="relative min-h-screen overflow-hidden bg-black">
    <!-- Mobile background -->
    <div class="absolute inset-0 lg:hidden">
      <img
        src="/images/hero-bg-bag-1280.webp"
        srcset="/images/hero-bg-bag-768.webp 768w, /images/hero-bg-bag-1280.webp 1280w, /images/hero-bg-bag-1920.webp 1920w"
        sizes="100vw"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover object-[65%_center] brightness-125 contrast-125 saturate-[1.25]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/25" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-surface/95" />
    </div>

    <!-- Desktop right visual -->
    <div class="absolute inset-0 hidden lg:block pointer-events-none">
      <div
        ref="bagLayerRef"
        class="absolute inset-y-0 right-[-1vw] w-[48vw] xl:w-[45vw] will-change-transform transition-transform duration-500 ease-out"
        :style="{ transform: parallaxTransform }"
      >
        <img
          src="/images/hero-bg-bag-1280.webp"
          srcset="/images/hero-bg-bag-768.webp 768w, /images/hero-bg-bag-1280.webp 1280w, /images/hero-bg-bag-1920.webp 1920w"
          sizes="48vw"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover object-center brightness-115 contrast-125 saturate-[1.3]"
        />
      </div>
      <!-- Very subtle red glow behind bag -->
      <div
        class="absolute right-[-9vw] top-1/2 -translate-y-1/2 w-[64vw] h-[64vw] max-w-[1120px] max-h-[1120px]"
        style="background: radial-gradient(circle at right center, rgba(255, 26, 26, 0.2), rgba(255, 26, 26, 0.085) 38%, rgba(255, 26, 26, 0.02) 56%, rgba(255, 26, 26, 0) 75%);"
      />
      <!-- Very subtle smoke/light haze -->
      <div
        class="absolute inset-y-0 right-[-7vw] w-[55vw] opacity-[0.09] blur-2xl mix-blend-screen"
        style="background: radial-gradient(ellipse at 82% 50%, rgba(255, 255, 255, 0.62) 0%, rgba(210, 210, 210, 0.28) 24%, rgba(150, 150, 150, 0.12) 44%, rgba(0, 0, 0, 0) 74%);"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#000000] via-black/95 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75" />
    </div>

    <!-- Subtle film grain -->
    <div
      class="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-soft-light"
      style="background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.32) 0 1px, transparent 1px 2px), repeating-linear-gradient(90deg, rgba(255,255,255,.24) 0 1px, transparent 1px 2px);"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[60%_40%] min-h-screen items-center py-24 lg:py-28">
        <div class="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 rounded-full px-5 py-2 text-brand-light text-sm font-medium"
          >
            <span class="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Набор открыт
          </div>

          <!-- Title -->
          <h1 class="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] font-bold uppercase tracking-tight leading-[0.88]">
            <span class="text-white">Академия</span>
            <br />
            <span class="text-brand">Кикбоксинга</span>
            <br />
            <span class="text-white/80 text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] xl:text-[6.8rem]">Сочи</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
            Профессиональные тренировки по кикбоксингу для детей и взрослых.
            Опытные тренеры, современный зал, путь к победам.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center gap-4 mt-3">
            <a href="#contact" class="btn-primary rounded-none">
              Записаться на тренировку
            </a>
            <a href="#about" class="btn-outline rounded-none border-white/35 bg-black/20">
              Узнать больше
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 sm:gap-12 mt-10 pt-10 border-t border-white/15 mx-auto lg:mx-0 justify-items-center lg:justify-items-start">
            <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
              <div class="font-display text-3xl sm:text-4xl font-bold text-brand">{{ stat.value }}</div>
              <div class="text-white/50 text-sm mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="hidden lg:block" />
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
      <span class="text-xs uppercase tracking-widest">Листайте вниз</span>
      <div class="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { value: '10+', label: 'Лет опыта' },
  { value: '500+', label: 'Учеников' },
  { value: '150+', label: 'Медалей' },
]

const bagLayerRef = ref(null)
const baseBagOffsetY = 32
const parallaxTransform = ref(`translate3d(0px, ${baseBagOffsetY}px, 0px)`)

function updateParallax(event) {
  if (window.innerWidth < 1024 || !bagLayerRef.value) return

  const moveX = (event.clientX / window.innerWidth - 0.5) * 20
  const moveY = (event.clientY / window.innerHeight - 0.5) * 12
  parallaxTransform.value = `translate3d(${moveX}px, ${moveY + baseBagOffsetY}px, 0)`
}

function resetParallax() {
  parallaxTransform.value = `translate3d(0px, ${baseBagOffsetY}px, 0px)`
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  window.addEventListener('mousemove', updateParallax, { passive: true })
  window.addEventListener('mouseleave', resetParallax, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateParallax)
  window.removeEventListener('mouseleave', resetParallax)
})
</script>
