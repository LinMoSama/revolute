import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useIndex from '@/hooks/useIndex'
export default function () {
  const { recharge, controlHandler } = useIndex()
  const router = useRouter()
  let show = ref(false)
  const homeIconList = [
    {
      title: '首页',
    },
    {
      title: '提现',
    },
    {
      title: '转账',
    },
    {
      title: '我的认购',
    },
    {
      title: '我的钱包',
    },
    {
      title: '邀请好友',
    },
    {
      title: '我的团队',
    },
    {
      title: '交易明细',
    },
  ]
  function changRoute(value: string) {
    switch (value) {
      case '首页':
        router.push({
          path: '/home',
        })
        break
      case '提现':
        router.push({
          path: '/withdraw',
        })
        break
      case '转账':
        router.push({
          path: '/transfer',
        })
        break
      case '我的认购':
        router.push({
          path: '/myPurchase',
        })
        break
      case '我的钱包':
        router.push({
          path: '/incomeDetail',
        })
        break
      case '邀请好友':
        router.push({
          path: '/invite',
        })
        break
      case '我的团队':
        router.push({
          path: '/myTeam',
        })
        break
      case '交易明细':
        router.push({
          path: '/withdrawdetail?active=0',
        })
        break
    }
  }
  return { show, homeIconList, changRoute }
}
