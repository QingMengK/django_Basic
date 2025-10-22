<template>
  <div>
    <h1>Items from Django API</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }} — {{ item.desc }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])

onMounted(async () => {
  const res = await axios.get('/api/items/')
  items.value = res.data
})
</script>
