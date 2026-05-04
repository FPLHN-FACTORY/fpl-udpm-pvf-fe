import type { RouteRecordRaw } from 'vue-router'
import { subjectsRoute } from './subjects'
import { roomsRoutes } from './rooms'
import { teachersRoute } from './teachers'
import { classesRoute } from './classes'
import { scoreTypesRoute } from './score-types'

export const extracurricularRoutes: RouteRecordRaw[] = [
  {
    path: '/extracurricular',
    meta: { title: 'Quản lý học tập ngoại khóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      subjectsRoute,
      ...roomsRoutes,
      teachersRoute,
      classesRoute,
      scoreTypesRoute
    ]
  }
]
