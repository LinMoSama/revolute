import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { login } from '@/service/api'
export default defineStore('wallect', () => {
  const isInstall =
    ref(localStorage.getItem('isInstall') === 'false' ? false : true) ||
    ref(false)

  const ethereum = window.ethereum

  let account = ref(localStorage.getItem('account')) || ref('')

  async function ConnectTheWallet() {
    try {
      if (!ethereum) return showFailToast('Metamask 未安装')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.setItem('account', accounts[0])
      account.value = accounts[0]
      const {
        data: {
          data: {
            userinfo: { token },
          },
        },
      } = await login({
        account: accounts[0],
      })
      localStorage.setItem('token', token)
    } catch (error: any) {
      console.log(error)
      if (error.code === 4001) {
        showFailToast('拒绝了访问权限')
      }
    }
  }

  return { ConnectTheWallet, account, ethereum, isInstall }
})
