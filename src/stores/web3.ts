declare global {
  interface Window {
    ethereum: any
  }
}
import Web3 from 'web3'
import { defineStore } from 'pinia'
import { usdtContractABI, usdtContractAddress } from '@/ABI/usdt'
import useWallcetStore from '@/stores/wallect'
import { ref } from 'vue'
export default defineStore('web3', () => {
  const ethereum = window.ethereum
  const web3 = new Web3(ethereum)
  const wallectSotre = useWallcetStore()
  let account = sessionStorage.getItem('account') || wallectSotre.account

  const usdtContract = ref<any>(null)

  return { ethereum, web3, usdtContract, account }
})
