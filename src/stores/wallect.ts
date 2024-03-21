import Web3 from 'web3'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { login } from '@/service/api'
import { useUserStore } from './user'
export default defineStore('wallect', () => {
  let loading = ref(false)
  const userStore = useUserStore()
  const isInstall = localStorage.getItem('isInstall') === 'true'
  let account = ref<string>(sessionStorage.getItem('account') || '')
  const ethereum = window.ethereum

  async function ConnectTheWallet() {
    try {
      console.log('isInstall', isInstall)
      if (!isInstall) return showFailToast('wallect not installed')
      loading.value = true
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log(accounts[0], 'accounts[0] wallect store ts')

      account.value = accounts[0]
      // 签名消息
      const message = `Welcome to revolute!\nThis signature request is to verify that you own the wallet that is trying to log in to revolute.\n\nWallet address:\n${account.value}\n\nThis request will not trigger blockchain transactions and cost any gas fees.`
      const messageHex = Web3.utils.utf8ToHex(message)
      const res = await ethereum.request({
        method: 'personal_sign',
        params: [messageHex, account.value],
      })
      console.log(res)
      console.log(res.code)

      const {
        data: {
          data: { userinfo },
        },
      } = await login({
        account: accounts[0],
      })
      loading.value = false
      userStore.userInfo = userinfo
      userStore.token = userinfo.token
      userStore.account = accounts[0]
      sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      sessionStorage.setItem('token', userinfo.token)
      sessionStorage.setItem('signRes', res)
      sessionStorage.setItem('account', accounts[0])
    } catch (error: any) {
      loading.value = false
      if (error.code === 4001) {
        showFailToast(' User denied message signature')
      }
    }
  }
  return {
    ConnectTheWallet,
    account,
    isInstall,
    loading,
  }
})
