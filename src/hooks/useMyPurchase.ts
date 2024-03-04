import { ref } from 'vue'
import {useRouter} from 'vue-router'  
export default function () {
  const menu = ref()  
  const router = useRouter()
  function goDetail () {
    router.push('/myPurchase/detail')
  }
  return { menu, goDetail }
}
