import useWallect from '@/stores/wallect'
import { storeToRefs } from 'pinia'
import { formatName } from '@/utils/utils'
export default function () {
  const { account } = storeToRefs(useWallect())
  const wallectStore = useWallect()
  let token = sessionStorage.getItem('token')
  return { wallectStore, account, formatName, token }
}
