import { createRouter, createWebHistory } from 'vue-router'
import PatternsView from '../views/PatternsView.vue'
import DashboardView from '../views/DashboardView.vue'
import SourcesView from '../views/SourcesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/patterns',
      name: 'patterns',
      component: PatternsView,
    },
    {
      path: '/sources',
      name: 'sources',
      component: SourcesView,
    },
  ],
})

export default router
