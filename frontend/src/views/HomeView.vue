<template>
  <div>
    <h2>首页（受保护）</h2>
    <div v-if="user">已登录：{{ user.username }} ({{ user.email }})</div>
    <div v-else>加载中…</div>
    <button @click="logout">登出</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

const fetchProfile = async () => {
  try {
    const res = await axios.get('/api/profile/')
    user.value = res.data
  } catch (e) {
    // token 无效或过期，重定向到登录
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    router.push({ name: 'login' })
  }
}

onMounted(() => {
  fetchProfile()
})

const logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push({ name: 'login' })
}
</script>
