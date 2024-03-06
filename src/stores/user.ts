import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {

    let token = ref<string>(localStorage.getItem('token')!) || ref('')
    let userInfo = ref<any>(localStorage.getItem('userInfo')!) || ref({})
    let initInfo = ref<any>(localStorage.getItem('initInfo')!) || ref({})

    return { token, userInfo, initInfo }
})
