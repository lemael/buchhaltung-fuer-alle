import { createRouter, createWebHistory } from 'vue-router'

import Dokumentation from '@/views/DokumentationView.vue'
import Page from '@/views/Page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'In Entwicklung',
      component: Page,
    },
    {
      path: '/dokumentation',
      name: 'dokumentation',
      component: Dokumentation,
    },
  ],
})

export default router
