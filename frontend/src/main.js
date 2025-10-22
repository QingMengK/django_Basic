import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

// axios 全局配置：带 token
axios.defaults.baseURL = 'http://127.0.0.1:8000' // 后端地址
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
