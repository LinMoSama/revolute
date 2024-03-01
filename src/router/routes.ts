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
    path: '/totalEarningsYesterday/:title',
    name: 'TotalEarningsYesterday',
    component: () => import('@/views/totalEarningsYesterday/index.vue'),
    props(router: any) {
      return {
        title: router.params.title,
      }
    },
  },
]
