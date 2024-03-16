import Web3 from 'web3'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { login } from '@/service/api'
import { useUserStore } from './user'
export default defineStore('wallect', () => {
  let loading = ref(false)

  const userStore = useUserStore()
  const isInstall =
    ref(sessionStorage.getItem('isInstall') === 'false' ? false : true) ||
    ref(false)
  let account = ref(sessionStorage.getItem('account')) || ref('')
  const ethereum = window.ethereum

  async function ConnectTheWallet() {
    try {
      if (!isInstall) return showFailToast('Metamask 未安装')
      loading.value = true
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log(accounts[0], 'accounts[0]')

      account.value = accounts[0]
      // 签名消息
      const message = `Welcome to revolute!\nThis signature request is to verify that you own the wallet that is trying to log in to revolute.\n\nWallet address:\n${account.value}\n\nThis request will not trigger blockchain transactions and cost any gas fees.`
      const messageHex = Web3.utils.utf8ToHex(message)
      const res = await ethereum.request({
        method: 'personal_sign',
        params: [messageHex, account.value],
      })
      console.log(res)
      console.log(res.code)

      const {
        data: {
          data: { userinfo },
        },
      } = await login({
        account: accounts[0],
      })
      loading.value = false
      userStore.userInfo = userinfo
      userStore.token = userinfo.token
      sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      sessionStorage.setItem('token', userinfo.token)
      sessionStorage.setItem('signRes', res)
      sessionStorage.setItem('account', accounts[0])
      window.location.reload()
    } catch (error: any) {
      loading.value = false
      console.log(error)
      if (error.code === 4001) {
        showFailToast(' User denied message signature')
      }
    }
  }
  const connectToMetaMask = async () => {
    try {
      const web3 = new Web3(ethereum)
      const accounts = await web3.eth.getAccounts()
      const address = await accounts[0]
      // logForm.value.account = accounts[0]
      // logForm.value.accessToken = accounts[0]
      const nonce = await web3.eth.getTransactionCount(address)
      // 生成要签名的消息
      const message = `Welcome to imomo!\nThis signature request is to verify that you own the wallet that is trying to log in to imomo.\n\nWallet address:\n${address}\nNonce: 579\n\nThis request will not trigger blockchain transactions and cost any gas fees.`

      // 请求用户签名
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      })

      // 使用 ethers.js 验证签名
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signingKey = new ethers.utils.SigningKey(address, provider.getSigner());

      // const recoveredAddress = ethers.utils.verifyMessage(message, signature);

      // // 验证签名
      // if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      //     console.log('Signature is valid!');
      // } else {
      //     console.error('Signature is not valid!');
      // }
      // const response = await axios(
      //   'http://45.154.2.218:8080/api/v1/userSku/list',
      //   {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       address,
      //       nonce,
      //       signature,
      //     }),
      //   }
      // )
      // console.log(JSON.parse(response.config.body))
      // logForm.value.loginToken = JSON.parse(response.config.body).signature
      // logForm.value.walletNum = JSON.parse(response.config.body).nonce
      // logForm.value.accessToken = JSON.parse(response.config.body).address
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)
    }
  }
  return { ConnectTheWallet, account, isInstall, connectToMetaMask, loading }
})
