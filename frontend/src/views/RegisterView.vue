<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="onRegister">
      <div><input v-model="username" placeholder="用户名" required /></div>
      <div><input v-model="email" placeholder="邮箱 (可选)" /></div>
      <div><input v-model="password" type="password" placeholder="密码" required /></div>
      <div><input v-model="password2" type="password" placeholder="确认密码" required /></div>
      <div><button type="submit">注册</button></div>
    </form>
    <p style="color:green">{{ msg }}</p>
    <p style="color:red">{{ error }}</p>
    <p>已有账号？ <router-link to="/login">登录</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const error = ref('')
const msg = ref('')
const router = useRouter()

const onRegister = async () => {
  try {
    const res = await axios.post('/api/register/', {
      username: username.value,
      email: email.value,
      password: password.value,
      password2: password2.value
    })
    msg.value = '注册成功，请登录'
    error.value = ''
    // 可直接跳转到登录页
    setTimeout(() => router.push({ name: 'login' }), 800)
  } catch (e) {
    // 展示后端返回的 validation error
    if (e.response?.data) {
      const data = e.response.data
      error.value = JSON.stringify(data)
    } else {
      error.value = '注册失败'
    }
  }
}
</script>
