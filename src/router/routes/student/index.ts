import type { RouteRecordRaw } from 'vue-router'
import { listRoute } from './list'
import { equipmentRoute } from './equipment'
import { contractTypeRoutes } from './contract-type'
import { contractVersionRoutes } from './contract-version'
import { signedContractRoute } from './signed-contract'
import { studentInfoRoutes } from './info'
import { transferRoutes } from './transfer'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    meta: { title: 'Quản lý học viên', icon: 'BxsUserDetail', isHeader: true },
    children: [
      listRoute,
      ...equipmentRoute,
      ...contractTypeRoutes,
      ...contractVersionRoutes,
      signedContractRoute,
      ...studentInfoRoutes,
      ...transferRoutes
    ]
  }
]
