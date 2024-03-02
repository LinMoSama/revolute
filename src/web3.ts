import Web3 from 'web3'
export async function getWebData(to: any, from: any, next: any) {
  if (window.ethereum) {
    // Metamask 已安装
    localStorage.setItem('isInstall', 'true')
    const ethereum = window.ethereum
    const web3 = new Web3(ethereum)
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
      // ethereum.on('chainChanged', function (chainChanged: string) {
      //   console.log('chainChanged', parseInt(chainChanged, 16))
      // })
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
