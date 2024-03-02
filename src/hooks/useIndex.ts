import { ref } from 'vue'
import useWallect from '@/stores/wallect'
import { storeToRefs } from 'pinia'
import { formatName } from '@/utils/utils'

export default function () {

  let alertShow = ref(false)
  const { account } = storeToRefs(useWallect())
  const wallectStore = useWallect()
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
  function buyHandle(value: any) {
    alertShow.value = true
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
  function recharge() {
    alert('充值')
  }
  function wallet() {
    alert('提现')
  }
  function transfer() {
    alert('转账')
  }
 
 
  function updateShow() {
    alertShow.value = false
  }
  return {
    account,
    controlList,
    wallectStore,
    alertShow,
    updateShow,
    formatName,
    controlHandler,
    buyHandle,
    closeAlert,
  }
}
