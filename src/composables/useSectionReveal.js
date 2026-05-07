import { onMounted, onUnmounted, ref } from 'vue'

export function useSectionReveal(customOptions = {}) {
  const sectionRef = ref(null)
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    if (!sectionRef.value) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      return
    }

    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches

    // On mobile we keep sections visible immediately.
    // This prevents "empty" blocks during anchor navigation with fixed header.
    if (isMobileViewport) {
      isVisible.value = true
      return
    }

    const {
      once = true,
      ...observerOptions
    } = customOptions

    const options = {
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px',
      ...observerOptions,
    }

    observer = new IntersectionObserver(([entry]) => {
      const entered = Boolean(entry?.isIntersecting)
      if (!entered) return

      isVisible.value = true

      if (once) {
        observer?.disconnect()
        observer = null
      }
    }, options)

    observer.observe(sectionRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    sectionRef,
    isVisible,
  }
}
