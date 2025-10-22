<template>
  <div>
    <h2>Items</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> — {{ item.desc }}
      </li>
    </ul>
    <form @submit.prevent="createItem">
      <input v-model="name" placeholder="name" />
      <input v-model="desc" placeholder="desc" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])
const name = ref('')
const desc = ref('')

const fetchItems = async () => {
  const res = await axios.get('/api/items/')
  items.value = res.data
}

const createItem = async () => {
  await axios.post('/api/items/', { name: name.value, desc: desc.value })
  name.value = ''
  desc.value = ''
  await fetchItems()
}

onMounted(fetchItems)
</script>
