import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('wallect', () => {
  const isInstall =
    ref(localStorage.getItem('isInstall') === 'false' ? false : true) ||
    ref(false)

  const ethereum = window.ethereum

  let account = ref(localStorage.getItem('account')) || ref('')

  async function ConnectTheWallet() {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.setItem('account', accounts[0])
      account.value = accounts[0]
    } catch (error: any) {
      console.log(error)
      if (error.code === 4001) {
        console.log('用户拒绝了访问权限')
      }
    }
  }

  return { ConnectTheWallet, account, ethereum, isInstall }
})
