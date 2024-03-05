/*
中间显示省略号的方法
str => 属于格式化的字符串
num = >保留显示的位数
*/

import { showToast } from 'vant'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  showToast('复制成功')
}

function clipboardError() {
  showToast('失败')
}

export default function handleClipboard(text: string, event: any) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}


export const formatName = (str: string, num = 4) => {
  return str
    ? str.substring(0, num) +
    '...' +
    str.substring(str.length - num, str.length)
    : ''
}
/* 保留小数后几位，默认两位，不需要四舍五入 */
export const formatDecimal = (num: number, decimal: number = 2) => {
  let numString = num.toString()
  if (!num) return 0
  numString = num.toString()
  let index = numString.indexOf('.')
  if (index !== -1) {
    numString = numString.substring(0, decimal + index + 1)
  } else {
    numString = numString.substring(0)
  }
  return parseFloat(numString).toFixed(decimal)
}

//时间戳转时间  年/月/日 时:分:秒
export const getHMS = (timestamp: any) => {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

  var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return Y + M + D + h + m + s;
}

// 隐藏用户中间地址
export const hiddenUserAccount = (addr: any) => {
  return addr.slice(0, 2) + '...' + addr.slice(38, addr.length)
}