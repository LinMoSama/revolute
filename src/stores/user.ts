import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {

    let token = ref<string>(localStorage.getItem('token')!) || ref('')
    return {token}
})
