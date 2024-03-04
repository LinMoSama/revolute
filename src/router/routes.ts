export default [
  {
    path: '/',
    redirect: '/home',
  },
  // 主页
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  // 昨日总收益
  {
    path: '/totalEarningsYesterday',
    name: 'TotalEarningsYesterday',
    component: () => import('@/views/totalEarningsYesterday/index.vue'),
    meta: { title: '昨日总收益' },
  },
  // 我的认购
  {
    path: '/myPurchase',
    name: 'MyPurchase',
    meta: { title: '我的认购' },
    component: () => import('@/views/MyPurchase/index.vue'),
  },
  // 我的认购详情
  {
    path: '/myPurchase/detail',
    name: 'MyPurchaseDetail',
    meta: { title: 'Compound Pool' },
    component: () => import('@/views/MyPurchase/components/Detail.vue'),
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
    meta: { title: '转账' },
    component: () => import('@/views/transfer/index.vue'),
  },
  // 收益明细
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    meta: { title: '收益明细' },
    component: () => import('@/views/incomeDetail/index.vue'),
  },
  // 邀请好友
  {
    path: '/invite',
    name: 'invite',
    meta: { title: '邀请好友' },
    component: () => import('@/views/invite/index.vue'),
  },
  // 我的团队
  {
    path: '/myTeam',
    name: 'myTeam',
    meta: { title: '我的团队' },
    component: () => import('@/views/myTeam/index.vue'),
  },
  // 团队人员
  {
    path: '/teamDetail',
    name: 'teamDetail',
    component: () => import('@/views/myTeam/detail.vue'),
  },
]
