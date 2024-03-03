import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default function () {
  const router = useRouter()
  let show = ref(true)
  const homeIconList = [
    {
      src: '/src/assets/images/home_icon.png',
      title: '首页',
    },
    {
      src: '/src/assets/images/chongzhi_icon.png',
      title: '充值',
    },
    {
      src: '/src/assets/images/tixian_icon.png',
      title: '提现',
    },
    {
      src: '/src/assets/images/zhuanzhang_icon.png',
      title: '转账',
    },
    {
      src: '/src/assets/images/rengou_icon.png',
      title: '我的认购',
    },
    {
      src: '/src/assets/images/mingxi_icon.png',
      title: '收益明细',
    },
    {
      src: '/src/assets/images/yaoqing_icon.png',
      title: '邀请好友',
    },
    {
      src: '/src/assets/images/team_icon.png',
      title: '我的团队',
    },
  ]
  function changRoute(value: string) {
    console.log(1)
    switch (value) {
      case '首页':
        router.push({
          path: '/home',
        })
        break
      case '充值':
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
      case '收益明细':
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
    }
  }
  return { show, homeIconList, changRoute }
}
