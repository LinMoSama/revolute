import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { showSuccessToast, showFailToast } from 'vant';
import { errorCodeHandler } from '@/utils/errorCodeHandler'
const server = axios.create({
    baseURL: '',
    timeout: 10000,
})


// 请求拦截器
server.interceptors.request.use(
    config => {
        const $userStore = useUserStore()
        // const token = $userStore.token
        // const token = localStorage.getItem('token')
        const token = 'b3dc0e31-3cdf-47ce-9fc7-124304970b0d'
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
        if (code && code !== 20000) {
            showFailToast(msg)
        }
        return response
    },
    err => {
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