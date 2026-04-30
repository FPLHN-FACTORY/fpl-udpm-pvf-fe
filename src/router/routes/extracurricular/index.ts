import type { RouteRecordRaw } from 'vue-router'
import { subjectsRoute } from './subjects'
import { roomsRoute } from './rooms'
import { teachersRoute } from './teachers'
import { classesRoute } from './classes'
import { scoreTypesRoute } from './score-types'

export const extracurricularRoutes: RouteRecordRaw[] = [
  {
    path: '/extracurricular',
    meta: { title: 'Quản lý học tập ngoại khóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      subjectsRoute,
      roomsRoute,
      teachersRoute,
      classesRoute,
      scoreTypesRoute
    ]
  }
]
