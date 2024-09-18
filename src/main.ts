import './sass/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import BaseDialog from './components/base/BaseDialog.vue'

const app = createApp(App)

app.component('BaseDialog', BaseDialog)

app.use(router)

app.mount('#app')
