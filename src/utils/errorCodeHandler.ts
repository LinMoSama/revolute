// 引入提示
import { showFailToast } from 'vant';

//处理错误函数
export function errorCodeHandler(code: number, msg?: string) {
    let message = ''
    switch (code) {
        case 0:
            message = msg!
            break
        case 401:
            message = '用户没有权限'
            break
        case 403:
            message = '用户权限不足'
            break
        case 404:
            message = '404 not found'
            break
        case 500:
            message = '服务器错误'
            break
        case 5001:
            message = msg!
            break
        default:
            message = '未知错误'
            break
    }
    //错误提示
    showFailToast(message)
}
