import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getInvestList, getUserInfo, addMount, getInit } from '@/service/api'
import { useUserStore } from '@/stores/user'
import { getReferrer } from '@/service/api'
import useWallect from '@/stores/wallect'
import { showFailToast, showSuccessToast } from 'vant'
import useWbe3Store from '@/stores/web3'
import { floatObj } from '@/utils/utils'
export default function () {
  const wallectStore = useWallect()
  const userStore = useUserStore()
  const web3Store = useWbe3Store()
  let alertShow = ref(false)
  const $router = useRouter()
  const investList = ref([] as any[])
  let isShowReference = ref(false)
  let itemID = ref(0)
  onMounted(() => {
    getInvestListHandler()
    // getAwardListHandler()
  })
  // 获取用户投资列表
  async function getInvestListHandler() {
    try {
      const {
        data: { data: data },
      } = await getInvestList()
      investList.value = data
    } catch (error) {
      console.log(error)
    }
  }

  // 用户投入资金
  async function addMountHandler(mount: string, financial_id: number) {
    try {
      const res = await addMount({
        mount,
        financial_id,
      })
      console.log(res.data.code)
      console.log(res.data.msg)
      if (res.data.code === 0 && res.data.msg === '余额不能足') {
        showFailToast('余额不足')
        return
      }
      console.log(res, '42 res')
    } catch (error) {
      console.log(error)
    }
  }
  // 判断是否填写推荐人
  function isShowReferenceHandler() {
    if (wallectStore.isInstall === false) {
      showFailToast('请安装Metamask 并连接钱包')
      return false
    }
    if (!userStore.token) {
      showFailToast('请先连接钱包')
      return false
    }
    if (
      userStore.userInfo.recommend === 0 ||
      userStore.userInfo.recommend === null
    ) {
      isShowReference.value = true
      return false
    } else {
      return true
    }
  }

  const controlList = [
    {
      icon: '/src/assets/images/recharge.png',
      title: '充值',
      type: 0,
    },
    {
      icon: '/src/assets/images/withdraw.png',
      title: '提现',
      type: 1,
    },
    {
      icon: '/src/assets/images/transfer.png',
      title: '转账',
      type: 2,
    },
  ]

  function closeAlert() {
    alertShow.value = false
  }

  function closeReferenceAlert() {
    isShowReference.value = false
  }
  // 获取用户信息方法
  async function getUserInfoHandler() {
    try {
      const {
        data: { data: data },
      } = await getUserInfo()
      localStorage.setItem('userInfo', JSON.stringify(data))
      userStore.userInfo = data
    } catch (error) {
      console.log(error)
    }
  }
  // 推荐人确定
  async function ReferenceAlertConfirm(salt: string) {
    try {
      const res = await getReferrer({
        salt,
      })

      // 获取用户信息
      getUserInfoHandler()
      isShowReference.value = false
      console.log(res.data, 'ReferenceAlertConfirm')
    } catch (error) {
      console.log(error)
    }
  }

  function confirmAlert(value: any) {
    try {
      addMountHandler(value, itemID.value)
      getUserInfoHandler()
      showSuccessToast('购买成功')
      closeAlert()
    } catch (error) {
      console.log(error)
    }
  }

  function buyHandle(value: any) {
    if (isShowReferenceHandler()) {
      getUserInfoHandler()
      itemID.value = value
      alertShow.value = true
    }
  }

  function controlHandler(type: number) {
    switch (type) {
      case 0:
        recharge()
        break
      case 1:
        wallet()
        break
      case 2:
        transfer()
        break
    }
  }

  async function recharge() {
    if (isShowReferenceHandler()) {
      try {
        const {
          data: { data: data },
        } = await getInit()
        console.log(data.coverdata.addr)
        console.log(web3Store.usdtContract.methods)
        let gasPrice = Number(await web3Store.web3.eth.getGasPrice())
        let price = floatObj.multiply(100, 10000)?.toString() + '00000000000000'
        const gas = await web3Store.usdtContract.methods
          .approve(data.coverdata.addr, price)
          .estimateGas()

        const val = await web3Store.usdtContract.methods
          .approve(data.coverdata.addr, price)
          .send({
            from: wallectStore.account as string,
            gas: String(Number(gas)),
            gasPrice: String(gasPrice),
          })

        const gas2 = await web3Store.usdtContract.methods
          .transfer(data.coverdata.addr, price)
          .estimateGas()

        const val2 = await web3Store.usdtContract.methods
          .transfer(data.coverdata.addr, price)
          .send({
            from: wallectStore.account as string,
            gas: String(Number(gas2)),
            gasPrice: String(gasPrice),
          })

        console.log(String(Number(gas)), 'gas')
        console.log(String(Number(gas2)), 'gas2')
        console.log(gasPrice, 'gasPrice')
        console.log(price, 'price')
        console.log(val)
      } catch (error) {
        console.log(error)
      }
    }
  }
  function wallet() {
    if (isShowReferenceHandler()) {
      $router.push('/withdraw')
    }
  }
  function transfer() {
    if (isShowReferenceHandler()) {
      $router.push('/transfer')
    }
  }

  function updateShow() {
    alertShow.value = false
  }
  return {
    investList,
    controlList,
    alertShow,
    isShowReference,
    updateShow,
    controlHandler,
    buyHandle,
    closeAlert,
    confirmAlert,
    closeReferenceAlert,
    ReferenceAlertConfirm,
    isShowReferenceHandler,
    addMountHandler,
    getUserInfoHandler,
  }
}
