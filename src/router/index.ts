import { createRouter, createWebHistory } from 'vue-router'
import PatternsView from '../views/PatternsView.vue'
import DashboardView from '../views/DashboardView.vue'
import SourcesView from '../views/SourcesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: 'dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'patterns',
          name: 'patterns',
          component: PatternsView,
        },
        {
          path: 'sources',
          name: 'sources',
          component: SourcesView,
        },
        {
          path: 'profile',
          component: () => import('../views/ProfileView.vue'),
          children: [
            {
              path: '',
              name: 'profile-general',
              component: () => import('../views/ProfileGeneralView.vue'),
            },
            {
              path: 'devices',
              name: 'profile-devices',
              component: () => import('../views/DevicesView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
