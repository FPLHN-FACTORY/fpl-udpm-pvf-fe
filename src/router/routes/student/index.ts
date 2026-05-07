import type { RouteRecordRaw } from 'vue-router'
import { equipmentRoute } from './equipment'
import { contractTypeRoutes } from './contract-type'
import { contractVersionRoutes } from './contract-version'
import { signedContractRoute } from './signed-contract'
import { studentInfoRoutes } from './info'
import { transferRoute } from './transfer'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    meta: { title: 'Quản lý học viên', icon: 'BxsUserDetail', isHeader: true },
    children: [
<<<<<<< HEAD
      ...equipmentRoute,
      contractTypeRoute,
      contractVersionRoute,
=======
      equipmentRoute,
      ...contractTypeRoutes,
      ...contractVersionRoutes,
>>>>>>> 1f269545cd89ecefc3ce5d2103b5439f2fa24426
      signedContractRoute,
      ...studentInfoRoutes,
      transferRoute
    ]
  }
]
