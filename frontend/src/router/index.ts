import { createRouter, createWebHistory } from 'vue-router'

import Dokumentation from '@/views/DokumentationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Dokumentation,
    },
    {
      path: '/dokumentation',
      name: 'dokumentation',
      component: Dokumentation,
    },
  ],
})

export default router
