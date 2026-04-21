import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router'
import './style.css'
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css';
import { setupDirectives } from './directives';

const app = createApp(App)

const pinia = createPinia()

// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

// 注册全局指令 v-admin
setupDirectives(app);

app.use(router)
app.mount('#app')