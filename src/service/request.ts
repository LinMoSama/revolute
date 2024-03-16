import axios from 'axios'
import { showSuccessToast, showFailToast } from 'vant'
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
let urlPro = 'https://api.revolute.cc'
let urlDeve = 'http://192.168.2.177:7786'
const server = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? urlDeve : urlPro,
  // baseURL: 'http://192.168.2.177:7786',
  // baseURL: 'https://api.revolute.cc',
  timeout: 10000,
})

// 请求拦截器
server.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    // const token = '8e7886ea-bdc9-4094-97b1-c3ccd61acc22'
    // const token = 'f3ac5f5e-7125-499f-8f6e-89bcc10d7bb0'
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
    if (err.response.data.code === 401) {
      showFailToast('Login invalid, login again')
      sessionStorage.clear()
      router.push('/home')
    }
    let { status } = err.response
    // errorCodeHandler(status)
    if (err && err.response) {
      // errorCodeHandler(err.response.status)
    } else {
      showFailToast('Failed to connect to the server!')
    }
    return Promise.reject(err)
  }
)

export default server
