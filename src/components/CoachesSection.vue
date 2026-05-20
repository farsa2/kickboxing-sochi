<template>
  <section
    id="coaches"
    ref="sectionRef"
    class="reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32 bg-surface-card"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center flex flex-col items-center gap-4 mb-16" data-reveal style="--reveal-delay: 80ms">
        <div class="flex items-center gap-3">
          <div class="w-12 h-px bg-brand" />
          <span class="text-brand font-medium text-sm uppercase tracking-widest">
            Наша команда
          </span>
          <div class="w-12 h-px bg-brand" />
        </div>

        <h2 class="section-title text-balance">
          Наши <span class="text-brand">тренеры</span>
        </h2>

        <p class="section-subtitle text-center">
          Опытные профессионалы, которые помогут вам достичь любых целей в кикбоксинге
        </p>
      </div>

      <!-- 3D Coverflow Carousel -->
      <div data-reveal style="--reveal-delay: 180ms">
        <Swiper
          :modules="swiperModules"
          effect="coverflow"
          :coverflowEffect="coverflowOptions"
          :centeredSlides="true"
          :loop="true"
          :grabCursor="true"
          :navigation="true"
          :pagination="{ clickable: true }"
          :slidesPerView="1.1"
          :spaceBetween="20"
          :breakpoints="swiperBreakpoints"
          class="coaches-swiper"
          @swiper="handleSwiperInit"
          @slideChangeTransitionEnd="handleSlideChange"
          @resize="handleSlideChange"
        >
          <SwiperSlide
            v-for="(coach, index) in trainers"
            :key="coach.name"
            class="coach-slide"
          >
            <article class="coach-card">
              <video
                :src="shouldLoadVideo(index) ? coach.video : undefined"
                :poster="coach.poster"
                loop
                muted
                playsinline
                :preload="shouldPrioritizeVideo(index) ? 'metadata' : 'none'"
                class="coach-media"
              />
            </article>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import { useSectionReveal } from '../composables/useSectionReveal'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { sectionRef, isVisible } = useSectionReveal()

const swiperModules = [EffectCoverflow, Navigation, Pagination]

const coverflowOptions = {
  rotate: 0,
  stretch: 0,
  depth: 220,
  modifier: 2.3,
  slideShadows: false,
}

const swiperBreakpoints = {
  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 28,
  },
}

const trainers = [
  {
    name: 'Лаша Амиранович',
    video: '/videos/coach-1-hq.mp4',
    poster: '/images/coach-poster-1-960.webp',
  },
  {
    name: 'Кристина Субуханкулова',
    video: '/videos/coach-2-hq.mp4',
    poster: '/images/coach-poster-2-960.webp',
  },
  {
    name: 'Елена Сидорова',
    video: '/videos/coach-3-hq.mp4',
    poster: '/images/coach-poster-3-960.webp',
  },
  {
    name: 'Георгий Яковлев',
    video: '/videos/optimized/video-1-web.mp4',
    poster: '/images/coach-poster-4-960.webp',
  },
  {
    name: 'Константин Исаков',
    video: '/videos/optimized/video-2-web.mp4',
    poster: '/images/coach-poster-5-960.webp',
  },
  {
    name: 'Юра Чернышев',
    video: '/videos/optimized/video-3-web.mp4',
    poster: '/images/coach-poster-6-960.webp',
  },
  {
    name: 'Максим Силин',
    video: '/videos/optimized/video-4-web.mp4',
    poster: '/images/coach-poster-7-960.webp',
  },
]

const eagerVideoIndexes = ref(new Set([0, 1, trainers.length - 1]))
const isMobileViewport = ref(false)

onMounted(() => {
  isMobileViewport.value = window.matchMedia('(max-width: 768px)').matches
})

function markVideoPriority(index) {
  const safeIndex = ((index % trainers.length) + trainers.length) % trainers.length
  const prevIndex = (safeIndex - 1 + trainers.length) % trainers.length
  const nextIndex = (safeIndex + 1) % trainers.length

  const nextSet = new Set(eagerVideoIndexes.value)
  nextSet.add(safeIndex)
  nextSet.add(prevIndex)
  nextSet.add(nextIndex)
  eagerVideoIndexes.value = nextSet
}

function shouldLoadVideo(index) {
  if (isMobileViewport.value) return false
  return eagerVideoIndexes.value.has(index)
}

function shouldPrioritizeVideo(index) {
  if (isMobileViewport.value) return false
  return eagerVideoIndexes.value.has(index)
}

function syncVideoPlayback(swiper) {
  if (!swiper?.el) return

  const videos = swiper.el.querySelectorAll('.coach-media')
  videos.forEach((video) => {
    const slide = video.closest('.swiper-slide')
    const isActive = slide?.classList.contains('swiper-slide-active')

    if (isActive) {
      video.play().catch(() => {})
      return
    }

    video.pause()
    try {
      video.currentTime = 0
    } catch {
      // Ignore when browser blocks time reset on not-ready video
    }
  })
}

function handleSwiperInit(swiper) {
  markVideoPriority(swiper?.realIndex ?? 0)
  syncVideoPlayback(swiper)
}

function handleSlideChange(swiper) {
  markVideoPriority(swiper?.realIndex ?? 0)
  syncVideoPlayback(swiper)
}
</script>

<style scoped>
.coaches-swiper {
  overflow: visible;
  padding-bottom: 72px;
}

.coach-slide {
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.coach-card {
  position: relative;
  height: 640px;
  border-radius: 24px;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
}

.coach-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.coaches-swiper .swiper-slide) {
  opacity: 0.52;
  filter: grayscale(0.35) brightness(0.74);
  transform: scale(0.88);
}

:deep(.coaches-swiper .swiper-slide-active) {
  opacity: 1;
  filter: grayscale(0) brightness(1);
  transform: scale(1);
}

:deep(.coaches-swiper .swiper-slide-active .coach-card) {
  border-color: rgba(225, 29, 72, 0.58);
  box-shadow: 0 34px 82px rgba(0, 0, 0, 0.58), 0 0 40px rgba(225, 29, 72, 0.3);
}

:deep(.coaches-swiper .swiper-slide-active .coach-media) {
  transform: scale(1.06);
}

:deep(.coaches-swiper .swiper-button-prev),
:deep(.coaches-swiper .swiper-button-next) {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  backdrop-filter: blur(8px);
  transition: all 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.coaches-swiper .swiper-button-prev:hover),
:deep(.coaches-swiper .swiper-button-next:hover) {
  border-color: rgba(225, 29, 72, 0.55);
  box-shadow: 0 0 20px rgba(225, 29, 72, 0.28);
}

:deep(.coaches-swiper .swiper-button-prev::after),
:deep(.coaches-swiper .swiper-button-next::after) {
  font-size: 14px;
  font-weight: 700;
}

:deep(.coaches-swiper .swiper-pagination-bullet) {
  width: 9px;
  height: 9px;
  opacity: 0.42;
  background: #9ca3af;
  transition: all 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.coaches-swiper .swiper-pagination-bullet-active) {
  width: 22px;
  border-radius: 999px;
  opacity: 1;
  background: #e11d48;
  box-shadow: 0 0 16px rgba(225, 29, 72, 0.5);
}

@media (max-width: 1279px) {
  .coach-card {
    height: 680px;
  }
}

@media (max-width: 767px) {
  .coaches-swiper {
    overflow: hidden;
    padding-bottom: 58px;
  }

  .coach-card {
    height: 580px;
    border-radius: 20px;
  }

  :deep(.coaches-swiper .swiper-button-prev),
  :deep(.coaches-swiper .swiper-button-next) {
    width: 40px;
    height: 40px;
  }
}
</style>