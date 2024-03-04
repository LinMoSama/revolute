import request from './request'

// 登录
export const login = (data: any) =>
  request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
  // 获取用户投资列表
  export const getInvestList = () =>
    request({
      url: 'api/financial/get_list' ,
      method: 'post',
    })
// 用户提现
export const getWithdraw = (data: any) => {
  return request({
    url: '/financial/add_mount',
    method: 'post',
    data,
  })
}
// 获取提现记录
export const getWithdrawList = () => {
  return request({
    url: '/financial/get_list',
    method: 'post',
  })
}
