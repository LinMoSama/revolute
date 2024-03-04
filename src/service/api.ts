import request from './request'


// 用户提现
export const getWithdraw = (data: any) => {
    return request({
        url: '/financial/add_mount',
        method: "post",
        data
    })
}
// 获取提现记录
export const getWithdrawList = () => {
    return request({
        url: '/financial/get_list',
        method: "post",
    })
}
