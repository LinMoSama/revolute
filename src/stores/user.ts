import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('userStore', () => {

    // let token = ref<string>(localStorage.getItem('token')!) || ref('')
    let token = ref<string>(sessionStorage.getItem('token')!) || ref('')

    let userInfo = ref<any>(sessionStorage.getItem('userInfo')!) || ref({})
    let initInfo = ref<any>(sessionStorage.getItem('initInfo')!) || ref({})

    return { token, userInfo, initInfo }
})
