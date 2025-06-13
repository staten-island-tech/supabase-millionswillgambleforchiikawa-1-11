<template>
  <div class="gacha">
    <button @click="rollGacha" :disabled="loading">
      {{ loading ? 'Rolling...' : 'Roll Gacha' }}
    </button>

    <p v-if="message">{{ message }}</p>

    <div v-if="rolledItem" class="result-card">
      <h2>{{ rolledItem.name }}</h2>
      <p>Rarity: {{ rolledItem.rarity }}</p>
      <p>{{ rolledItem.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { gachaPool } from '../stores/ChiikawaInfo'
import supabase from '../main'
import { useAuthStore } from '../stores/pinia'
import { storeToRefs } from 'pinia'

interface GachaItem {
  id: number
  name: string
  rarity: number
  description: string
}

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const rolledItem = ref<GachaItem | null>(null)
const message = ref('')
const loading = ref(false)

const rollGacha = async () => {
  if (!user.value) {
    message.value = 'You must be logged in to roll.'
    return
  }

  loading.value = true
  message.value = ''

  // Pick random item
  const item = gachaPool[Math.floor(Math.random() * gachaPool.length)]
  rolledItem.value = item

  // Add to inventory
  const { error } = await supabase.from('inventory').insert({
    user_id: user.value.id, // uuid of user
    chiikawa_id: item.id, // id of rolled item (int2)
  })

  if (error) {
    message.value = 'Failed to add item to inventory.'
    console.error(error)
  } else {
    message.value = `You rolled: ${item.name}! 🎉`
  }

  loading.value = false
}
</script>

<style scoped>
.gacha {
  text-align: center;
  padding: 2rem;
}
.result-card {
  margin-top: 1rem;
  border: 2px solid #999;
  padding: 1rem;
  border-radius: 1rem;
}
button {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background-color: #ffd700;
  border: none;
  border-radius: 1rem;
}
</style>
