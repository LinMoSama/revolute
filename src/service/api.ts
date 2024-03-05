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
    url: 'api/financial/get_list',
    method: 'post',
  })

// 获取用户信息
export const getUserInfo = () =>
  request({
    url: 'api/user/get_user_info',
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
// export const getWithdrawList = () => {
//   return request({
//     url: '/api/financial/get_list',
//     method: 'post',
//   })
// }

// 用户团队
export const getUserTeam = () => {
  return request({
    url: '/api/financial/get_user_my_team',
    method: 'post',
  })
}
// 用户团队成员
export const getUserTeamList = (data: any) => {
  return request({
    url: '/api/financial/get_user_team_list',
    method: 'post',
    data
  })
}
// 用户直推详情
export const getUserRecommendList = (data: any) => {
  return request({
    url: '/api/financial/get_user_recommend_list',
    method: 'post',
    data
  })
}

// 获取收益明细列表
export const getFinancialList = (data: any) => {
  return request({
    url: '/api/financial/get_user_award_log',
    method: 'post',
    data,
  })
}


