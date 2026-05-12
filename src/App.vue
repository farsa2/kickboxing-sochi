<template>
  <div class="min-h-screen bg-surface text-white overflow-x-hidden">
    <NavBar @navigate="scrollTo" />
    <template v-if="isPrivacyPage">
      <PrivacyPolicyPage />
    </template>
    <template v-else>
      <HeroSection />
      <AboutSection />
      <CoachesSection />
      <ScheduleSection />
      <PricingSection />
      <GallerySection />
      <ContactSection />
    </template>
    <FooterSection @navigate="scrollTo" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CoachesSection from './components/CoachesSection.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import PricingSection from './components/PricingSection.vue'
import GallerySection from './components/GallerySection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import PrivacyPolicyPage from './components/PrivacyPolicyPage.vue'

const isPrivacyPage = ref(false)

function updateRouteState() {
  isPrivacyPage.value = window.location.pathname === '/privacy'
}

function getHeaderOffset() {
  const headers = Array.from(document.querySelectorAll('[data-fixed-header]'))
  const activeHeader = headers.find((header) => window.getComputedStyle(header).display !== 'none')
  return activeHeader?.offsetHeight ?? 80
}

function scrollTo(id) {
  if (isPrivacyPage.value) {
    window.location.href = `/#${id}`
    return
  }

  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = document.getElementById(id)
  if (el) {
    const headerOffset = getHeaderOffset()
    const top = window.scrollY + el.getBoundingClientRect().top - headerOffset
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }
}

onMounted(() => {
  updateRouteState()
  window.addEventListener('popstate', updateRouteState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', updateRouteState)
})
</script>
