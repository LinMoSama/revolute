import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { login } from '@/service/api'
import { useUserStore } from './user'
export default defineStore('wallect', () => {
  const userStore = useUserStore()
  const isInstall =
    ref(sessionStorage.getItem('isInstall') === 'false' ? false : true) ||
    ref(false)
  let account = ref(sessionStorage.getItem('account')) || ref('')
  const ethereum = window.ethereum

  async function ConnectTheWallet() {
    try {
      if (!ethereum) return showFailToast('Metamask 未安装')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      sessionStorage.setItem('account', accounts[0])
      account.value = accounts[0]
      const {
        data: {
          data: { userinfo },
        },
      } = await login({
        account: accounts[0],
      })
      console.log(accounts[0], 'accounts[0]')
      console.log('account', accounts[0])
      userStore.userInfo = userinfo
      userStore.token = userinfo.token
      sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      sessionStorage.setItem('token', userinfo.token)
      window.location.reload()
    } catch (error: any) {
      console.log(error)
      if (error.code === 4001) {
        showFailToast('拒绝了访问权限')
      }
    }
  }

  return { ConnectTheWallet, account, isInstall }
})
