import 'amfe-flexible'
import '@/utils/setRem'
import './style/reset.scss'
import './style/reset_van.scss'
import 'vant/es/toast/style'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './web3'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
