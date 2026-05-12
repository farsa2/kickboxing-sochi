<template>
  <nav class="z-[130]">
    <!-- Mobile fixed header -->
    <header
      data-fixed-header="mobile"
      class="fixed top-0 left-0 right-0 lg:hidden z-[130] pt-[env(safe-area-inset-top)] transition-all duration-300"
      :class="scrolled || mobileOpen
        ? 'bg-surface/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/35'
        : 'bg-transparent border-b border-transparent'"
    >
      <div class="h-16 px-4 flex items-center justify-between">
        <button
          class="flex items-center gap-2"
          @click="goToHero"
          aria-label="Перейти на главную"
        >
          <img
            src="/logo.png"
            alt="Kickboxing Academy Sochi"
            class="h-9 w-9 rounded-full object-contain ring-1 ring-white/15"
          />
        </button>

        <button
          class="p-2 rounded border text-white transition-all duration-300"
          :class="scrolled || mobileOpen ? 'bg-white/5 border-white/25' : 'bg-black/30 border-white/35'"
          :aria-expanded="mobileOpen"
          aria-label="Открыть меню"
          @click="toggleMobileMenu"
        >
          <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile fullscreen menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-[125] lg:hidden bg-black/70 backdrop-blur-sm"
        @click="closeMobileMenu"
      >
        <div
          class="absolute left-0 right-0 top-[calc(env(safe-area-inset-top)+4rem)] bottom-0 bg-surface-card/98 border-t border-white/10 px-4 pt-6 pb-6 flex flex-col"
          @click.stop
        >
          <div class="flex flex-col gap-2">
            <button
              v-for="item in navItems"
              :key="item.id"
              class="w-full text-left px-4 py-4 text-white text-3xl font-display uppercase tracking-wide hover:bg-white/5 rounded transition-colors"
              @click="navigateAndClose(item.id)"
            >
              {{ item.label }}
            </button>
          </div>

          <button
            class="mt-auto w-full bg-brand text-white font-semibold py-4 rounded text-lg transition-all duration-300 hover:bg-brand-light"
            @click="navigateAndClose('contact')"
          >
            Записаться
          </button>
        </div>
      </div>
    </Transition>

    <!-- Desktop header -->
    <header
      data-fixed-header="desktop"
      class="hidden lg:block fixed top-0 left-0 right-0 z-[120] transition-all duration-300"
      :class="scrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <button
            class="flex items-center gap-3 group"
            @click="$emit('navigate', 'hero')"
          >
            <img
              src="/logo.png"
              alt="Kickboxing Academy Sochi"
              class="h-10 w-10 rounded-full object-contain ring-1 ring-white/10 flex-shrink-0"
            />
            <div>
              <span class="font-display text-xl font-bold uppercase tracking-wide text-white">
                Kickboxing
              </span>
              <span class="font-display text-xl font-bold uppercase tracking-wide text-brand ml-1">
                Academy
              </span>
            </div>
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="item in navItems"
              :key="item.id"
              class="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded transition-colors duration-200 hover:bg-white/5"
              @click="$emit('navigate', item.id)"
            >
              {{ item.label }}
            </button>
            <button
              class="ml-4 bg-brand text-white font-semibold px-6 py-2.5 rounded text-sm transition-all duration-300 hover:bg-brand-light hover:shadow-lg hover:shadow-brand/25"
              @click="$emit('navigate', 'contact')"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>
    </header>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['navigate'])

const mobileOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { id: 'about', label: 'О нас' },
  { id: 'coaches', label: 'Тренеры' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'pricing', label: 'Цены' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'contact', label: 'Контакты' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMobileMenu() {
  mobileOpen.value = false
}

function toggleMobileMenu() {
  mobileOpen.value = !mobileOpen.value
}

function navigateAndClose(id) {
  mobileOpen.value = false
  requestAnimationFrame(() => emitNavigate(id))
}

function goToHero() {
  mobileOpen.value = false
  requestAnimationFrame(() => emitNavigate('hero'))
}

function handleResize() {
  if (window.innerWidth >= 1024) {
    mobileOpen.value = false
  }
}

function emitNavigate(id) {
  // wrapped helper keeps template handlers clean
  emit('navigate', id)
}

onMounted(() => {
  handleScroll()
  handleResize()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>
