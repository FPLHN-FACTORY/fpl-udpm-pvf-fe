import type { RouteRecordRaw } from 'vue-router'
import { listRoute } from './list'
import { equipmentRoute } from './equipment'
import { contractTypeRoutes } from './contract-type'
import { contractVersionRoutes } from './contract-version'
import { signedContractRoute } from './signed-contract'
<<<<<<< HEAD
import { infoRoute } from './info'
import { transferRoutes } from './transfer'
=======
import { studentInfoRoutes } from './info'
import { transferRoute } from './transfer'
>>>>>>> e0d8881dc330515d3cd946714453e1d0a3cc6f4d

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    meta: { title: 'Quản lý học viên', icon: 'BxsUserDetail', isHeader: true },
    children: [
<<<<<<< HEAD
      listRoute,
      equipmentRoute,
      contractTypeRoute,
      contractVersionRoute,
      signedContractRoute,
      infoRoute,
      ...transferRoutes
=======
      ...equipmentRoute,
      ...contractTypeRoutes,
      ...contractVersionRoutes,
      signedContractRoute,
      ...studentInfoRoutes,
      transferRoute
>>>>>>> e0d8881dc330515d3cd946714453e1d0a3cc6f4d
    ]
  }
]
