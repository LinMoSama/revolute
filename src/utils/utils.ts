/*
中间显示省略号的方法
str => 属于格式化的字符串
num = >保留显示的位数
*/
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
