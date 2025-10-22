<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <input class="search" type="text" placeholder="Search or jump to..." />
      <div class="user-info">
        <span>{{ username }}</span>
        <button @click="logout">退出</button>
      </div>
    </header>

    <div class="content">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <ul>
          <li><a href="#">🏠 首页</a></li>
          <li><a href="#">📦 仓库</a></li>
          <li><a href="#">⚙️ 设置</a></li>
        </ul>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <h2>欢迎回来，{{ username }}！</h2>
        <p>这里是一个仿 GitHub 风格的主页。</p>

        <div class="repo-list">
          <div class="repo-card" v-for="i in 3" :key="i">
            <h3>示例仓库 {{ i }}</h3>
            <p>项目简介：这是一个示例项目。</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('用户')

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  } else {
    username.value = '清梦' // TODO: 可改为从后端加载用户名
  }
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #24292e;
  color: white;
  padding: 10px 20px;
}

.search {
  width: 250px;
  padding: 5px;
  border-radius: 5px;
  border: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info button {
  background-color: #2ea44f;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #f6f8fa;
  border-right: 1px solid #ddd;
  padding: 15px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar a {
  color: #0366d6;
  text-decoration: none;
  display: block;
  padding: 8px 0;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.repo-list {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.repo-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
</style>
