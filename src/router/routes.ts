export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/totalEarningsYesterday',
    name: 'TotalEarningsYesterday',
    component: () => import('@/views/totalEarningsYesterday/index.vue'),
    meta: { title: '昨日总收益' },
  },
  {
    path: '/myPurchase',
    name: 'MyPurchase',
    meta: { title: '我的认购' },
    component: () => import('@/views/MyPurchase/index.vue'),
  },
  // 提现
  {
    path: '/withdraw',
    name: 'Withdraw',
    meta: { title: '提现' },
    component: () => import('@/views/withdraw/index.vue'),
  },
  // 提现记录
  {
    path: '/withdrawdetail',
    name: 'WithdrawDetail',
    component: () => import('@/views/withdraw/details.vue'),
  },
  // 提现详情页
  {
    path: '/withdrawinner',
    name: 'WithdrawInner',
    component: () => import('@/views/withdraw/innerDetail.vue'),
  },
  // 转账
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('@/views/transfer/index.vue'),
  },
  // 收益明细
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    component: () => import('@/views/incomeDetail/index.vue'),
  },
  // 邀请好友
  {
    path: '/invite',
    name: 'invite',
    component: () => import('@/views/invite/index.vue'),
  },
  // 我的团队
  {
    path: '/myTeam',
    name: 'myTeam',
    component: () => import('@/views/myTeam/index.vue'),
  },
  // 团队人员
  {
    path: '/teamDetail',
    name: 'teamDetail',
    component: () => import('@/views/myTeam/detail.vue'),
  },
]
