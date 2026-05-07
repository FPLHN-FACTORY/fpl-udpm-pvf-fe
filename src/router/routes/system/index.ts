import type { RouteRecordRaw } from 'vue-router'
import { usersRoute } from './users'
import { rolesRoutes } from './roles'
import { permissionsRoutes } from './permissions'
import { settingsRoute } from './settings'
import { logRoute } from './log'

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    meta: { title: 'Hệ thống', icon: 'BxServer', isHeader: true },
    children: [
      usersRoute,
      {
        path: 'security',
        meta: { title: 'Bảo mật & Phân quyền', icon: 'BxsKeyWrapper' },
        children: [
          ...rolesRoutes,
          ...permissionsRoutes
        ]
      },
      ...logRoute,
      settingsRoute
    ]
  }
]
