import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { showSuccessToast, showFailToast } from 'vant'
import { errorCodeHandler } from '@/utils/errorCodeHandler'
let urlPro = 'http://api.revolute.cc'
let urlDeve = 'http://192.168.2.177:7786'
// alert(process.env.NODE_ENV);
const server = axios.create({ 
  baseURL: process.env.NODE_ENV === 'development' ? urlDeve : urlPro,
  // baseURL: 'http://192.168.2.177:7786',
  // baseURL: 'http://api.revolute.cc',
  timeout: 10000,
})

// 请求拦截器
server.interceptors.request.use(
  config => {
    const $userStore = useUserStore()
    // const token = $userStore.token
    const token = sessionStorage.getItem('token')
    // const token = '8e7886ea-bdc9-4094-97b1-c3ccd61acc22'
    if (token) {
      config.headers!.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
server.interceptors.response.use(
  response => {
    let { code, msg } = response.data
    if (code === 20000) {
      showSuccessToast(msg)
    }
    // if (code && code !== 20000) {
    //     showFailToast(msg)
    // }
    return response
  },
  err => {
    console.log(err)
    if (
      err.response.data.code === 401 &&
      err.response.data.msg === '请登录后操作'
    ) {
      showFailToast('登录失效，请重新登录')
      sessionStorage.clear()
      window.location.href = '/home'
      // window.location.reload()
    }
    let { status } = err.response
    // errorCodeHandler(status)
    if (err && err.response) {
      // errorCodeHandler(err.response.status)
    } else {
      showFailToast('连接服务器失败!')
    }
    return Promise.reject(err)
  }
)

export default server
