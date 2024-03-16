import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useIndex from '@/hooks/useIndex'
export default function () {
  const { recharge, controlHandler } = useIndex()
  const router = useRouter()
  let show = ref(false)
  const homeIconList = [
    {
      title: 'Home',
      id: 1,
    },
    {
      title: 'Withdrawal',
      id: 2,
    },
    {
      title: 'Transfer',
      id: 3,
    },
    {
      title: 'My subscription',
      id: 4,
    },
    {
      title: 'My wallet',
      id: 5,
    },
    {
      title: 'Invite friendsf',
      id: 6,
    },
    {
      title: 'My team',
      id: 7,
    },
    {
      title: 'Transaction details',
      id: 8,
    },
  ]
  function changRoute(value: number) {
    switch (value) {
      case 1:
        router.push({
          path: '/home',
        })
        break
      case 2:
        router.push({
          path: '/withdraw',
        })
        break
      case 3:
        router.push({
          path: '/transfer',
        })
        break
      case 4:
        router.push({
          path: '/myPurchase',
        })
        break
      case 5:
        router.push({
          path: '/incomeDetail',
        })
        break
      case 6:
        router.push({
          path: '/invite',
        })
        break
      case 7:
        router.push({
          path: '/myTeam',
        })
        break
      case 8:
        router.push({
          path: '/withdrawdetail?active=0',
        })
        break
    }
  }
  return { show, homeIconList, changRoute }
}
