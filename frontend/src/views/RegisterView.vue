<template>
  <div class="register-container">
    <h2>用户注册</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="用户名" required />
      <input v-model="email" type="email" placeholder="邮箱" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <input v-model="confirmPassword" type="password" placeholder="确认密码" required />
      <button type="submit">注册</button>
    </form>

    <p>
      已有账号？
      <router-link to="/login">去登录</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('两次密码不一致！')
    return
  }

  try {
    // TODO: 替换成真实 Django API
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })

    if (response.ok) {
      alert('注册成功，请登录！')
      router.push('/login')
    } else {
      const data = await response.json()
      alert('注册失败：' + JSON.stringify(data))
    }
  } catch (err) {
    alert('网络错误，请检查后端是否运行')
  }
}
</script>

<style scoped>
.register-container {
  max-width: 320px;
  margin: 100px auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  width: 100%;
  padding: 8px;
  background-color: #0366d6;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #024c9b;
}
</style>
