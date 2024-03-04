import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default function () {
  let alertShow = ref(false)
  const $router = useRouter()

  let isSowReference = ref(false)
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
    isSowReference.value = false
  }
  function ReferenceAlertConfirm(value: any) {
    console.log('ReferenceAlertConfirm', value)
  }
  function confirmAlert(value: any) {
    console.log('confirmAlert', value)
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
    $router.push('/withdraw')
  }
  function transfer() {
    $router.push('/transfer')
  }

  function updateShow() {
    alertShow.value = false
  }
  return {
    controlList,
    alertShow,
    isSowReference,
    updateShow,
    controlHandler,
    buyHandle,
    closeAlert,
    confirmAlert,
    closeReferenceAlert,
    ReferenceAlertConfirm,
  }
}
