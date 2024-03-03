import useWallect from '@/stores/wallect'
import { storeToRefs } from 'pinia'
import { formatName } from '@/utils/utils'
export default function () {
  const { account } = storeToRefs(useWallect())
  const wallectStore = useWallect()

  return { wallectStore, account, formatName }
}
