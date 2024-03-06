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
// import InfiniteScroll from 'vue-infinite-scroll'
import InfiniteScroll from 'vue-infinite-scroll';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(InfiniteScroll)


app.mount('#app')
