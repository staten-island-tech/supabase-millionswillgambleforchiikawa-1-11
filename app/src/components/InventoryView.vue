<template>
  <div class="inventory">
    <h1>Your Inventory</h1>

    <div v-if="loading">Loading inventory...</div>
    <div v-else-if="items.length === 0">You have no items yet.</div>

    <div v-else class="cards">
      <div v-for="item in items" :key="item.inventory_id" class="card">
        <h2>{{ item.name }}</h2>
        <p>⭐ Rarity: {{ item.rarity }}</p>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import supabase from '../main'
import { useAuthStore } from '../stores/pinia'
import { gachaPool } from '../stores/ChiikawaInfo'

const authStore = useAuthStore()
const user = authStore.user

const loading = ref(true)
const items = ref<any[]>([])

onMounted(async () => {
  if (!user) return

  const { data, error } = await supabase
    .from('inventory')
    .select('id, gacha_id, obtained_at')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching inventory:', error)
    loading.value = false
    return
  }

  // Merge with gachaPool info
  items.value = data.map((entry) => {
    const item = gachaPool.find((i) => i.id === entry.gacha_id)
    return {
      inventory_id: entry.id,
      obtained_at: entry.obtained_at,
      ...item,
    }
  })

  loading.value = false
})
</script>

<style scoped>
.inventory {
  padding: 2rem;
  text-align: center;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 1rem;
  width: 20rem;
  background-color: #fff8e1;
}
</style>
