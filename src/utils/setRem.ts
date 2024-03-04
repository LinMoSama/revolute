const baseSize = 375 / 10 //跟postcss.config.js中rootValue的值是一致的
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 375 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 375
  // 设置页面根节点字体大小 最高为两倍图 即设计稿为750
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}

//ts需要加 export 不然会报下面的错误
//无法在 "--isolatedModules" 下编译“rem.ts”，因为它被视为全局脚本文件。请添加导入、导出或空的 "export {}" 语句来使它成为模块。
export {}
