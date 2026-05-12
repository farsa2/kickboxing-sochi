<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-surface" />
      <div class="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="flex flex-col items-center gap-6">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 rounded-full px-5 py-2 text-brand-light text-sm font-medium"
        >
          <span class="w-2 h-2 bg-brand rounded-full animate-pulse" />
          Набор открыт
        </div>

        <!-- Title -->
        <h1 class="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-balance leading-none">
          <span class="text-white">Академия</span>
          <br />
          <span class="text-brand">Кикбоксинга</span>
          <br />
          <span class="text-white/80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Сочи</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed text-balance">
          Профессиональные тренировки по кикбоксингу для детей и взрослых.
          Опытные тренеры, современный зал, путь к победам.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <a href="#contact" class="btn-primary">
            Записаться на тренировку
          </a>
          <a href="#about" class="btn-outline">
            Узнать больше
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 sm:gap-16 mt-12 pt-12 border-t border-white/10">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="font-display text-3xl sm:text-4xl font-bold text-brand">{{ stat.value }}</div>
            <div class="text-white/50 text-sm mt-1">{{ stat.label }}</div>
          </div>
        </div>
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
const stats = [
  { value: '10+', label: 'Лет опыта' },
  { value: '500+', label: 'Учеников' },
  { value: '150+', label: 'Медалей' },
]
</script>
