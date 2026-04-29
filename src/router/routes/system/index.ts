import type { RouteRecordRaw } from 'vue-router'
import { usersRoute } from './users'
import { rolesRoute } from './roles'
import { settingsRoute } from './settings'
import { logsRoute } from './logs'

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    meta: { title: 'Hệ thống', icon: 'BxServer', isHeader: true },
    children: [
      usersRoute,
      rolesRoute,
      settingsRoute,
      logsRoute
    ]
  }
]
