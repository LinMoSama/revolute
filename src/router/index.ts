import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { getWebData, getContract } from '@/web3'
import routes from './routes'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  getWebData(next)
})

router.afterEach((to, from) => {
  getContract()
})

export default router
