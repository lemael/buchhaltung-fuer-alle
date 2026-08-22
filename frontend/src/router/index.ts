import { createRouter, createWebHistory } from 'vue-router'

import Dokumentation from '@/views/DokumentationView.vue'
import Page from '@/views/Page.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
 
    {
      path: '/dokumentation',
      name: 'dokumentation',
      component: Dokumentation,
    },
    {
      path: '/',
      component: DashboardLayout, // Layout wrapper für die Dashboard-Seiten, enthält <RouterView /> für die Anzeige der untergeordneten Routen
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView, // Die Hauptseite des Dashboards, die unter dem Layout angezeigt wird
        },
        {
          path: 'buchungen',
          name: 'buchungen',
          component: () => import('@/views/BuchungenView.vue'),
        },
        {
          path: 'kategorien',
          name: 'kategorien',
          component: () => import('@/views/KategorienView.vue'),
        },
        {
          path: 'neue-buchung',
          name: 'neue-buchung',
          component: () => import('@/views/NeueBuchungView.vue'),
        },
        // für weitere Seiten hier hinzufügen...
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'In Entwicklung',
      component: Page,
    },
  ],
})

export default router
