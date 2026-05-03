import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/pages/LoginPage.vue'
import MainLayout from '../components/templates/MainLayout.vue'
import TuyenSinhPage from '../components/pages/home/index.vue'
import { recruitmentHiddenRoutes, recruitmentRoutes } from './routes/recruitment/index'
import { studentRoutes } from './routes/student/index'
import { culturalHiddenRoutes, culturalRoutes } from './routes/cultural/index'
import { extracurricularRoutes } from './routes/extracurricular/index'
import { trainingRoutes } from './routes/training/index'
import { expensesRoutes } from './routes/expenses/index'
import { activitiesRoutes } from './routes/activities/index'
import { gearRoutes } from './routes/gear/index'
import { disciplineHiddenRoutes, disciplineRoutes } from './routes/discipline/index'
import { evaluationHiddenRoutes, evaluationRoutes } from './routes/evaluation/index'
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
      path: '/tuyensinh',
      name: 'tuyensinh',
      component: TuyenSinhPage,
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
        ...recruitmentHiddenRoutes,
        ...studentRoutes,
        ...culturalRoutes,
        ...culturalHiddenRoutes,
        ...extracurricularRoutes,
        ...trainingRoutes,
        ...expensesRoutes,
        ...activitiesRoutes,
        ...gearRoutes,
        ...disciplineRoutes,
        ...disciplineHiddenRoutes,
        ...evaluationRoutes,
        ...evaluationHiddenRoutes,
        ...systemRoutes
      ]
    }
  ]
})

export default router
