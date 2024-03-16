import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAwardList } from '@/service/api'
export default function () {
  let awardList = ref()
  let page = ref(1)
  const router = useRouter()
  const {
    meta: { title },
  } = useRoute()

  function onClickLeft() {
    router.back()
  }

  function scrollLoading(e: any) {
    const dom = e.target
    var scrollTop = dom.scrollTop //滑入屏幕上方的高度
    var windowHeitht = dom.clientHeight //能看到的页面的高度
    var scrollHeight = dom.scrollHeight //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
    let total = scrollTop + windowHeitht
    if (parseInt(total) >= parseInt(scrollHeight) - 30) {
      console.log(awardList.value.data.length, '21')
      console.log(awardList.value.total)
      if (awardList.value.data.length >= awardList.value.total) {
        return
      }
      page.value++
      try {
        const res = getAwardList({
          var_page: page.value,
          list_rows: 10,
          award_type: 0,
          yesterday: 1,
        }).then(res => {
          console.log(res)
          awardList.value.data = [
            ...awardList.value.data,
            ...res.data.data.data,
          ]
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  function getAwardListHandler() {
    //获取奖励明细
    getAwardList({
      var_page: page.value,
      list_rows: 10,
      award_type: 0,
      yesterday: 1,
    }).then(res => {
      awardList.value = res.data.data
      console.log(awardList.value)
    })
  }
  return {
    awardList,
    title,
    onClickLeft,
    scrollLoading,
    getAwardListHandler,
  }
}
