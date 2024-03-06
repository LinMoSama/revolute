declare global {
  interface Window {
    ethereum: any
  }
}
import Web3 from 'web3'
import { defineStore } from 'pinia'
import useWallectStore from './wallect'
import { usdtContractABI, usdtContractAddress } from '@/ABI/usdt'

export default defineStore('web3',  () => {
  const wallectStore = useWallectStore()
  const ethereum = window.ethereum
  const web3 = new Web3(ethereum)

  const usdtContract = new web3.eth.Contract(
    usdtContractABI,
    usdtContractAddress,
    {
      from: wallectStore.account === null ? undefined : wallectStore.account,
    }
  )

  return { ethereum, web3, usdtContract }
})
