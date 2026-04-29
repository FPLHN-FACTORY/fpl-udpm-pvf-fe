import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/pages/LoginPage.vue'
import MainLayout from '../components/templates/MainLayout.vue'
import { recruitmentRoutes } from './routes/recruitment/index'
import { studentRoutes } from './routes/student/index'
import { extracurricularRoutes } from './routes/extracurricular/index'
import { trainingRoutes } from './routes/training/index'
import { systemRoutes } from './routes/system/index'

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
          meta: { title: 'Dashboards', icon: 'BxGridAlt' }
        },
        ...recruitmentRoutes,
        ...studentRoutes,
        ...extracurricularRoutes,
        ...trainingRoutes,
        ...systemRoutes
      ]
    }
  ]
})

export default router