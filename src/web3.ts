
export async function getWebData(to: any, from: any, next: any) {
  if (window.ethereum) {
    // Metamask 已安装
    localStorage.setItem('isInstall', 'true')
    const ethereum = window.ethereum
    //#region
    /*  const web3 = new Web3(ethereum)
    const res = await web3.eth.getBalance(
      '0x641c5f3f06b8C4eE01394890E46dF3153Bd25aa8'
    )
    console.log(res) */
    //#endregion
    // 请求账户访问权限
    try {
      // // 获取当前以太坊网络的网络 ID
      // const res = await web3.eth.net.getId()
      // // 获取当前以太坊网络的链 ID 的方法
      // const res2 = await web3.eth.getChainId()
      // console.log(res, res2)
      // 监听网络变化
      // networkChanged
      // The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.
      // ethereum.on('networkChanged', function (networkIDstring: string) {
      //   console.log('networkChanged', networkIDstring)
      // })
      ethereum.on('chainChanged', function (chainChanged: string) {
        console.log('chainChanged', parseInt(chainChanged, 16))
      })
      // 监听 MetaMask 的账户切换事件
      ethereum.on('accountsChanged', function (accounts: string[]) {
        if (accounts.length === 0) {
          // 用户断开了 MetaMask 账户连接
          console.log('用户断开了 MetaMask 账户连接')
        } else {
          // 用户切换了 MetaMask 账户
          console.log('用户切换了 MetaMask 账户:', accounts[0])
        }
      })
    } catch (error: any) {
      console.log(error)
    }
  } else {
    // Metamask 未安装
    console.log('Metamask 未安装')
    localStorage.setItem('isInstall', 'false')
  }
  next()
}
