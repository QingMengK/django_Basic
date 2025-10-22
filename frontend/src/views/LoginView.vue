<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="用户名" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>

        <p class="register-link">
      还没有账号？
      <a @click.prevent="goRegister" href="#">去注册</a>
    </p>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const goRegister = () => {
  router.push('/register')
}
const login = async () => {
  // TODO: 替换成真实 Django API
  if (username.value && password.value) {
    localStorage.setItem('token', 'fake-jwt-token')
    router.push('/home')
  } else {
    alert('请输入用户名和密码')
  }
}
</script>

<style scoped>
.login-container {
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
  background-color: #42b883;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #2a8d64;
}
</style>
