import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { login } from '@/service/api'
import { useUserStore } from './user'
export default defineStore('wallect', () => {
  const userStore = useUserStore()
  const isInstall =
    ref(localStorage.getItem('isInstall') === 'false' ? false : true) ||
    ref(false)
  let account = ref(localStorage.getItem('account')) || ref('')
  const ethereum = window.ethereum
  async function ConnectTheWallet() {
    try {
      if (!ethereum) return showFailToast('Metamask 未安装')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.setItem('account', accounts[0])
      account.value = accounts[0]
      const {
        data: {
          data: { userinfo },
        },
      } = await login({
        account: accounts[0],
      })
      userStore.userInfo = userinfo
      userStore.token = userinfo.token
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      localStorage.setItem('token', userinfo.token)
    } catch (error: any) {
      console.log(error)
      if (error.code === 4001) {
        showFailToast('拒绝了访问权限')
      }
    }
  }

  return { ConnectTheWallet, account, isInstall }
})
