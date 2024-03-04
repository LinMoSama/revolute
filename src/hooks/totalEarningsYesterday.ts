import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default function () {
  const router = useRouter()
  const {
    meta: { title },
  } = useRoute()

  function onClickLeft() {
    router.back()
  }
  const propsData = reactive([
    {
      product: '产品一 (USDT)',
      money: 149.5,
    },
    {
      product: '产品二 (USDT)',
      money: 149.5,
    },
    {
      product: '产品三 (USDT)',
      money: 149.5,
    },
    {
      product: '产品四 (USDT)',
      money: 149.5,
    },
  ])
  const propsData2 = reactive([
    {
      acc: '0x....sdfsfsd',
      income: '+149.50',
      classify: '一代',
    },
    {
      acc: '0x....sdfsfsd',
      income: '+149.50',
      classify: '二代',
    },
    {
      acc: '0x....sdfsfsd',
      income: '+149.50',
      classify: '三代',
    },
  ])
  return {
    title,
    propsData,
    propsData2,
    onClickLeft,
  }
}
