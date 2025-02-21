import './assets/main.css'
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { googleClientId } from '~/config/env'
import GoogleSignInPlugin from "vue3-google-signin"
import GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(GoogleSignInPlugin, {
  clientId: googleClientId,
});

app.use(GoogleLogin, {
  clientId: googleClientId,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
