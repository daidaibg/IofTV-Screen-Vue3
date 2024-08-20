import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'

import {registerEcharts} from "@/plugins/echarts"
//不使用mock 请注释掉
import { mockXHR } from "@/mock/index";
mockXHR()

const app = createApp(App)
registerEcharts(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
