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
    meta: { title: "Yesterday's total income" },
  },
  // 我的认购
  {
    path: '/myPurchase',
    name: 'MyPurchase',
    meta: { title: 'My subscription' },
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
    meta: { title: 'Withdrawal' },
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
    meta: { title: 'Transfer' },
    component: () => import('@/views/transfer/index.vue'),
  },
  // 收益明细
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    meta: { title: 'My wallet' },
    component: () => import('@/views/incomeDetail/index.vue'),
  },
  // 邀请好友
  {
    path: '/invite',
    name: 'invite',
    meta: { title: 'Invite friends' },
    component: () => import('@/views/invite/index.vue'),
  },
  // 我的团队
  {
    path: '/myTeam',
    name: 'myTeam',
    meta: { title: 'My team' },
    component: () => import('@/views/myTeam/index.vue'),
  },
  // 团队人员
  {
    path: '/teamDetail',
    name: 'teamDetail',
    component: () => import('@/views/myTeam/detail.vue'),
  },
  {
    path: '/teamDirectDetail',
    name: 'teamDirectDetail',
    component: () => import('@/views/myTeam/directDetail.vue'),
  },
]
