<template>
  <div class="min-h-screen bg-surface text-white overflow-x-hidden">
    <NavBar @navigate="scrollTo" />
    <HeroSection />
    <AboutSection />
    <CoachesSection />
    <ScheduleSection />
    <PricingSection />
    <GallerySection />
    <ContactSection />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CoachesSection from './components/CoachesSection.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import PricingSection from './components/PricingSection.vue'
import GallerySection from './components/GallerySection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

function getHeaderOffset() {
  const headers = Array.from(document.querySelectorAll('[data-fixed-header]'))
  const activeHeader = headers.find((header) => window.getComputedStyle(header).display !== 'none')
  return activeHeader?.offsetHeight ?? 80
}

function scrollTo(id) {
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
</script>
