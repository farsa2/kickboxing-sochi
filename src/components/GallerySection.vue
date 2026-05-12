<template>
  <section
    id="gallery"
    ref="sectionRef"
    class="reveal-section scroll-mt-20 lg:scroll-mt-24 py-24 lg:py-32"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center flex flex-col items-center gap-4 mb-16" data-reveal style="--reveal-delay: 80ms">
        <div class="flex items-center gap-3">
          <div class="w-12 h-px bg-brand" />
          <span class="text-brand font-medium text-sm uppercase tracking-widest">
            Фотогалерея
          </span>
          <div class="w-12 h-px bg-brand" />
        </div>

        <h2 class="section-title text-balance">
          Наши <span class="text-brand">моменты</span>
        </h2>
      </div>

      <div class="gallery-layout">
        <button
          type="button"
          class="gallery-item gallery-item-hero group"
          data-reveal
          style="--reveal-delay: 180ms"
          @click="openLightbox(0)"
        >
          <img
            :src="galleryImages[0].src"
            :alt="galleryImages[0].alt"
            loading="lazy"
            class="gallery-image"
          />
          <div class="gallery-overlay">
            <div class="gallery-overlay-icon">
              <svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <path d="M21 21l-5.2-5.2m2.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </button>

        <div class="gallery-side-grid">
          <button
            v-for="image in sideImages"
            :key="image.src"
            type="button"
            class="gallery-item gallery-item-side group"
            data-reveal
            :style="{ '--reveal-delay': `${230 + image.index * 80}ms` }"
            @click="openLightbox(image.index)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              class="gallery-image"
            />
            <div class="gallery-overlay">
              <div class="gallery-overlay-icon">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                  <path d="M21 21l-5.2-5.2m2.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="gallery-bottom-grid">
        <button
          v-for="image in bottomImages"
          :key="image.src"
          type="button"
          class="gallery-item gallery-item-bottom group"
          data-reveal
          :style="{ '--reveal-delay': `${560 + (image.index - 5) * 80}ms` }"
          @click="openLightbox(image.index)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="gallery-image"
          />
          <div class="gallery-overlay">
            <div class="gallery-overlay-icon">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <path d="M21 21l-5.2-5.2m2.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="lightboxOpen"
            class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            @click.self="lightboxOpen = false"
          >

            <button
              class="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              @click="lightboxOpen = false"
              aria-label="Закрыть"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              @click="prevImage"
              aria-label="Предыдущее фото"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <img
              :src="galleryImages[currentImage].src"
              :alt="galleryImages[currentImage].alt"
              class="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            <button
              class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              @click="nextImage"
              aria-label="Следующее фото"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

          </div>
        </Transition>
      </Teleport>

    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSectionReveal } from '../composables/useSectionReveal'

const { sectionRef, isVisible } = useSectionReveal()

const lightboxOpen = ref(false)
const currentImage = ref(0)

const galleryImages = [
  { src: '/images/gallery-premium/gallery-01.jpg', alt: 'Интенсивный спарринг в ринге' },
  { src: '/images/gallery-premium/gallery-02.jpg', alt: 'Детская тренировка с работой в паре' },
  { src: '/images/gallery-premium/gallery-03.jpg', alt: 'Женская группа: отработка ударной техники' },
  { src: '/images/gallery-premium/gallery-04.jpg', alt: 'Групповая функциональная подготовка детей' },
  { src: '/images/gallery-premium/gallery-05.jpg', alt: 'Соревновательный спарринг при зрителях' },
  { src: '/images/gallery-premium/gallery-06.jpg', alt: 'Борцовская техника: тренер и ученик' },
  { src: '/images/gallery-premium/gallery-07.jpg', alt: 'Детская активность и координация на площадке' },
  { src: '/images/gallery-premium/gallery-08.jpg', alt: 'Тренер работает с учеником на поле' },
  { src: '/images/gallery-premium/gallery-09.jpg', alt: 'Эмоции после победы в ринге' },
  { src: '/images/gallery-premium/gallery-10.jpg', alt: 'Боевой крупный план во время поединка' },
]

const sideImages = computed(() => galleryImages.slice(1, 5).map((image, idx) => ({
  ...image,
  index: idx + 1,
})))

const bottomImages = computed(() => galleryImages.slice(5).map((image, idx) => ({
  ...image,
  index: idx + 5,
})))

function openLightbox(index) {
  currentImage.value = index
  lightboxOpen.value = true
}

function nextImage() {
  currentImage.value = (currentImage.value + 1) % galleryImages.length
}

function prevImage() {
  currentImage.value = (currentImage.value - 1 + galleryImages.length) % galleryImages.length
}
</script>

<style scoped>
.gallery-layout {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 18px;
}

.gallery-side-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.gallery-bottom-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #111;
  cursor: pointer;
}

.gallery-item-hero {
  min-height: 620px;
}

.gallery-item-side {
  min-height: 300px;
}

.gallery-item-bottom {
  min-height: 220px;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  transition: background 300ms ease, opacity 300ms ease;
}

.gallery-overlay-icon {
  opacity: 0;
  transform: translateY(8px);
  transition: transform 320ms ease, opacity 320ms ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.08);
}

.gallery-item:hover .gallery-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.3));
}

.gallery-item:hover .gallery-overlay-icon {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .gallery-layout {
    grid-template-columns: 1fr;
  }

  .gallery-item-hero {
    min-height: 520px;
  }

  .gallery-item-side {
    min-height: 260px;
  }

  .gallery-bottom-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .gallery-layout,
  .gallery-side-grid,
  .gallery-bottom-grid {
    gap: 12px;
  }

  .gallery-side-grid,
  .gallery-bottom-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gallery-item {
    border-radius: 12px;
  }

  .gallery-item-hero {
    min-height: 360px;
  }

  .gallery-item-side,
  .gallery-item-bottom {
    min-height: 170px;
  }
}
</style>
