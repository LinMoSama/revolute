import { createRouter, createWebHistory } from 'vue-router'
import { getWebData } from '@/web3'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  getWebData(to, from, next)
})

router.afterEach((to, from) => {})

export default router
