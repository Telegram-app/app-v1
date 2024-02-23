import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { registerLayouts } from './layouts/register'

const pinia = createPinia()

import '@/assets/styles/style.scss'

import App from './App.vue'

const app =  createApp(App)

app.use(pinia)
app.use(router)

registerLayouts(app)

app.mount('#app')

