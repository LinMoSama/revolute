import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getInvestList, getUserInfo, addMount, getInit } from '@/service/api'
import { useUserStore } from '@/stores/user'
import { getReferrer, rechargeSuccess } from '@/service/api'
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
  let Chongzhishow = ref(false)
  let balance = ref(0)
  let inputMoney = ref('')
  let loading = ref(false)
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
      showFailToast('请安装并连接钱包')
      return false
    }
    if (!userStore.token) {
      showFailToast('请先连接钱包')
      return false
    }
    console.log(JSON.parse(sessionStorage.getItem('userInfo')!), 'userInfo')
    if (
      JSON.parse(sessionStorage.getItem('userInfo')!).recommend === 0 ||
      JSON.parse(sessionStorage.getItem('userInfo')!).recommend === null
    ) {
      isShowReference.value = true
      return false
    } else {
      return true
    }
  }

  const controlList = [
    {
      icon: '../assets/images/recharge.png',
      title: '充值',
      type: 0,
    },
    {
      icon: '../assets/images/withdraw.png',
      title: '提现',
      type: 1,
    },
    {
      icon: '../assets/images/transfer.png',
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
      // localStorage.setItem('userInfo', JSON.stringify(data))
      sessionStorage.setItem('userInfo', JSON.stringify(data))

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
      // window.location.reload()
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
  // 充值
  async function recharge() {
    if (isShowReferenceHandler()) {
      try {
        Chongzhishow.value = true
        //查询余额
        const res = await web3Store.usdtContract.methods
          .balanceOf(wallectStore.account)
          .call()
        let b = Number(res) / 10 ** 18
        balance.value = b
        console.log(b)
        console.log(res, 'res');
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
  function cancel() {
    inputMoney.value = ''
    Chongzhishow.value = false
  }
  // 充值确定按钮调合约
  async function confim() {
    try {
      if (Number(inputMoney.value) > balance.value) {
        return
      }
      if (Number(inputMoney.value) <= 0) {
        return
      }
      let iptMoney = Number(inputMoney.value)
      Chongzhishow.value = false
      inputMoney.value = ''
      loading.value = true
      const {
        data: { data: data },
      } = await getInit()
      console.log(data.coverdata.addr, 'addr')
      console.log(
        web3Store.usdtContract.methods,
        '(web3Store.usdtContract.methods'
      )
      //授权
      let gasPrice = Number(await web3Store.web3.eth.getGasPrice())
      console.log(gasPrice, 'gasPrice')

      let price =
        floatObj.multiply(iptMoney, 10000)?.toString() + '00000000000000'
      console.log(price, 'price')
      const approveGas = await web3Store.usdtContract.methods
        .approve(data.coverdata.addr, price)
        .estimateGas()

      const approveRes = await web3Store.usdtContract.methods
        .approve(data.coverdata.addr, price)
        .send({
          from: wallectStore.account as string,
          gas: String(Number(approveGas)),
          gasPrice: String(gasPrice),
        })
      console.log(approveRes, '授权')
      console.log(String(Number(approveGas)), 'approveGas')
      //调用转账合约
      const transferGas = await web3Store.usdtContract.methods
        .transfer(data.coverdata.addr, price)
        .estimateGas()

      const transferRes = await web3Store.usdtContract.methods
        .transfer(data.coverdata.addr, price)
        .send({
          from: wallectStore.account as string,
          gas: String(Number(transferGas)),
          gasPrice: String(gasPrice),
        })

      console.log(String(Number(transferGas)), 'transferGas')
      console.log(price, 'price')
      console.log(transferRes, '转账')
      let obj = convertBigIntToNumber(transferRes)
      rechargeSuccessHandler({
        transactionHash: obj.transactionHash,
        to_addr: obj.to,
        returnValues: JSON.stringify(obj.events.Transfer.returnValues),
        blockNumber: obj.blockNumber,
        gasUsed: obj.gasUsed,
        blockHash: obj.blockHash,
        effectiveGasPrice: obj.effectiveGasPrice,
        status: obj.status,
      })
      loading.value = false
      showSuccessToast('操作成功')
    } catch (error: any) {
      loading.value = false
      console.log(error)
      if (error.code === 4001) {
        showFailToast('已拒绝')
      } else {
        console.log(error)
        showFailToast('操作失败')
      }
      console.log(error)
    }
  }

  async function rechargeSuccessHandler(obj: any) {
    await rechargeSuccess(obj)
  }
  function convertBigIntToNumber(
    obj: Record<string, any>
  ): Record<string, any> {
    for (const key in obj) {
      if (typeof obj[key] === 'bigint') {
        obj[key] = Number(obj[key])
      } else if (typeof obj[key] === 'object') {
        obj[key] = convertBigIntToNumber(obj[key] as Record<string, any>)
      }
    }
    return obj
  }
  function max() {
    console.log('max')
    inputMoney.value = String(balance.value)
  }
  return {
    loading,
    inputMoney,
    balance,
    investList,
    controlList,
    alertShow,
    isShowReference,
    Chongzhishow,
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
    cancel,
    confim,
    max,
    recharge,
  }
}
