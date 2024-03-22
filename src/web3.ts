import { usdtContractABI, usdtContractAddress } from '@/ABI/usdt'
import useWeb3Store from '@/stores/web3'
import Web3 from 'web3'
let accounts: any = []
export async function getWebData(next: any) {
  if (window.ethereum) {
    console.log('Metamask 已安装')
    // Metamask 已安装
    localStorage.setItem('isInstall', 'true')
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('isInstall', 'true')
    })
    console.log(localStorage.getItem('isInstall'))
    const ethereum = window.ethereum
    accounts = await new Web3(ethereum).eth.getAccounts()
    // 请求账户访问权限
    try {
      // 监听 MetaMask 的网络切换事件
      ethereum.on('chainChanged', function (chainChanged: string) {
        console.log('chainChanged', parseInt(chainChanged, 16))
        // sessionStorage.clear()
        sessionStorage.clear()
        window.location.reload()
      })
      // 监听 MetaMask 的账户切换事件
      ethereum.on('accountsChanged', function (accounts: string[]) {
        if (accounts.length === 0) {
          // 用户断开了 MetaMask 账户连接
          console.log('用户断开了 MetaMask 账户连接')
          // sessionStorage.clear()
          sessionStorage.clear()
          window.location.reload()
        } else {
          let account = sessionStorage.getItem('account')
          console.log(account)
          if (account && account !== accounts[0]) {
            sessionStorage.clear()
            window.location.reload()
          }
          // 用户切换了 MetaMask 账户
          // console.log('用户切换了 MetaMask 账户:', accounts[0])
        }
      })
    } catch (error: any) {}
  } else {
    // Metamask 未安装
    console.log('Metamask 未安装')
    sessionStorage.clear()
    localStorage.setItem('isInstall', 'false')
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('isInstall', 'false')
    })
  }
  next()
}

export const getContract = async () => {
  const web3Store = useWeb3Store()
  const web3 = new Web3(window.ethereum)
  // const web3 = new Web3('https://bsc-pokt.nodies.app')
  console.log(accounts[0])
  try {
    web3Store.usdtContract = new web3.eth.Contract(
      usdtContractABI,
      usdtContractAddress,
      {
        from: accounts[0],
      }
    )
  } catch (error) {
    console.log(error)
  }
}
