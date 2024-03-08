import request from './request'

// 用户充值成功
export const rechargeSuccess = (data: any) => {
  return request({
    url: 'api/financial/user_mycz',
    method: 'post',
    data,
  })
}

// 获取余额变动记录
export const getMoneyLog = (data: any) => {
  return request({
    url: '/api/user/get_money_log',
    method: 'post',
    data,
  })
}
// 复利池转出
export const compoundOut = (data: any) => {
  return request({
    url: '/api/financial/set_money_award_to_money',
    method: 'post',
    data,
  })
}
// 获取用户购买认购记录
export const getUserFinancialList = (data: any) => {
  return request({
    url: '/api/financial/get_user_financial',
    method: 'post',
    data,
  })
}
// 初始化加载
export const getInit = () => {
  return request({
    url: '/api/common/get_init',
    method: 'post',
  })
}
// 用户投入资金
export const addMount = (data: any) =>
  request({
    url: '/api/financial/add_mount',
    method: 'post',
    data,
  })
// 获取奖励明细
export const getAwardList = (data: any) =>
  request({
    url: '/api/financial/get_user_award_log',
    method: 'post',
    data,
  })
// 获取用户信息
export const getUserInfo = () =>
  request({
    url: '/api/user/get_user_info',
    method: 'post',
  })
// 推荐人
export const getReferrer = (data: any) =>
  request({
    url: '/api/user/user_recommend',
    method: 'post',
    data,
  })
// 获取奖励明细
export const getRewardList = (data: any) =>
  request({
    url: '/api/financial/get_user_award_log',
    method: 'post',
    data,
  })
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

// 用户提现
export const getWithdraw = (data: any) => {
  return request({
    url: 'api/financial/money_withdrawal',
    method: 'post',
    data,
  })
}

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
    data,
  })
}
// 用户直推详情
export const getUserRecommendList = (data: any) => {
  return request({
    url: '/api/financial/get_user_recommend_list',
    method: 'post',
    data,
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

// 用户转账
export const getTransferTo = (data: any) => {
  return request({
    url: '/api/financial/transfer_money',
    method: 'post',
    data,
  })
}
// 获取交易记录
export const getTransferList = (data: any) => {
  return request({
    url: '/api/financial/get_transfer_list',
    method: 'post',
    data,
  })
}

// 根据记录id查询交易详情
export const getIdToSearch = (data: any) => {
  return request({
    url: '/api/financial/get_transfer',
    method: 'post',
    data,
  })
}
