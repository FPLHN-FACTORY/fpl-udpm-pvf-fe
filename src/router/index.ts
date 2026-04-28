import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/pages/LoginPage.vue'
import MainLayout from '../components/templates/MainLayout.vue'
import { recruitmentRoutes } from './routes/recruitment'
import { studentRoutes } from './routes/student'
import { extracurricularRoutes } from './routes/extracurricular'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../components/pages/DashboardPage.vue'),
          meta: { title: 'Dashboards', icon: 'Squares2X2Icon' }
        },
        ...recruitmentRoutes,
        ...studentRoutes,
        ...extracurricularRoutes
      ]
    }
  ]
})

export default router