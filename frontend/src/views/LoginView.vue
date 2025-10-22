<template>
  <div>
    <h2>登录</h2>
    <form @submit.prevent="onLogin">
      <div><input v-model="username" placeholder="用户名" required /></div>
      <div><input v-model="password" type="password" placeholder="密码" required /></div>
      <div><button type="submit">登录</button></div>
    </form>
    <p style="color:red">{{ error }}</p>
    <p>没有账号？ <router-link to="/register">注册</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const onLogin = async () => {
  try {
    const res = await axios.post('/api/login/', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)
    router.push({ name: 'home' })
  } catch (e) {
    error.value = e.response?.data?.error || '登录失败'
  }
}
</script>
