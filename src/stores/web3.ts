import Web3 from 'web3'
import useWallect from './wallect'
import { defineStore } from 'pinia'
declare global {
  interface Window {
    ethereum: any
  }
}

export default defineStore('web3', async () => {
 
  return {  }
})
