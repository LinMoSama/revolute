declare global {
  interface Window {
    ethereum: any
  }
}
import Web3 from 'web3'
import { defineStore } from 'pinia'
import { usdtContractABI, usdtContractAddress } from '@/ABI/usdt'
export default defineStore('web3', () => {
  const ethereum = window.ethereum
  const web3 = new Web3(ethereum)
  let account = sessionStorage.getItem('account')!
  console.log(account,'@@@@@@@@@')
  const usdtContract = new web3.eth.Contract(
    usdtContractABI,
    usdtContractAddress,
    // {
    //   from: account,
    // }
  )
  return { ethereum, web3, usdtContract }
})
