<template>
  <footer class="border-t border-white/5 bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Kickboxing Academy Sochi"
              class="h-10 w-10 rounded-full object-contain ring-1 ring-white/10 flex-shrink-0"
            />
            <div>
              <span class="font-display text-lg font-bold uppercase tracking-wide text-white">Kickboxing</span>
              <span class="font-display text-lg font-bold uppercase tracking-wide text-brand ml-1">Academy</span>
            </div>
          </div>
          <p class="text-white/40 text-sm leading-relaxed max-w-sm">
            Академия Кикбоксинга Сочи -- профессиональная школа единоборств для тех,
            кто стремится к победам и совершенству.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Навигация</h4>
          <ul class="flex flex-col gap-2.5">
            <li v-for="link in navLinks" :key="link.id">
              <a
                :href="linkHref(link.id)"
                class="text-white/40 hover:text-brand text-sm transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white/40 hover:text-brand text-sm transition-colors"
              >
                Политика в отношении обработки персональных данных
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact summary -->
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Контакты</h4>
          <ul class="flex flex-col gap-2.5 text-white/40 text-sm">
          <li>г. Сочи, Транспортная ул., д. 2</li>
            <li>
            <a href="tel:+79615080000" class="hover:text-brand transition-colors">
              +7 (961) 508-00-00
              </a>
            </li>
            <li>
              <a href="mailto:info@kickboxing-sochi.ru" class="hover:text-brand transition-colors">
                info@kickboxing-sochi.ru
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Реквизиты</h4>
          <ul class="flex flex-col gap-2.5 text-white/40 text-sm">
            <li>ИП Дзидзигури Л.А.</li>
            <li>ИНН: 231909054698</li>
            <li>ОГРНИП: 323237500212435</li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/20 text-xs">
          {{ new Date().getFullYear() }} Академия Кикбоксинга Сочи. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
function linkHref(sectionId) {
  return window.location.pathname === '/privacy' ? `/#${sectionId}` : `#${sectionId}`
}

const navLinks = [
  { id: 'about', label: 'О нас' },
  { id: 'coaches', label: 'Тренеры' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'pricing', label: 'Цены' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'contact', label: 'Контакты' },
]
</script>
