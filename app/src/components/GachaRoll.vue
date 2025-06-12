<template>
  <div class="gacha">
    <button @click="rollGacha" :disabled="loading || money < 15">
      {{ loading ? 'Rolling...' : 'Roll Gacha (15 coins)' }}
    </button>

    <p v-if="message">{{ message }}</p>

    <div v-if="rolledItem" class="result-card">
      <h2>{{ rolledItem.name }}</h2>
      <p>Rarity: {{ rolledItem.rarity }}</p>
      <p>{{ rolledItem.description }}</p>
    </div>

    <p>Your coins: {{ money }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gachaPool } from '../data/ChiikawaInfo'
import supabase from '../main' // adjust to your Supabase client
import { useAuthStore } from '../stores/pinia'

const authStore = useAuthStore()
const user = authStore.user

const money = ref(0)
const rolledItem = ref(null)
const message = ref('')
const loading = ref(false)

const fetchMoney = async () => {
  if (!user) return
  const { data, error } = await supabase.from('profiles').select('money').eq('id', user.id).single()
  if (data) money.value = data.money
  else console.error(error)
}

onMounted(fetchMoney)

const rollGacha = async () => {
  if (money.value < 15) {
    message.value = 'Not enough coins to roll!'
    return
  }

  loading.value = true
  message.value = ''

  // Deduct coins
  const newBalance = money.value - 15
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ money: newBalance })
    .eq('id', user.id)

  if (updateError) {
    console.error(updateError)
    message.value = 'Error updating balance.'
    loading.value = false
    return
  }

  money.value = newBalance

  // Randomly choose a gacha item
  const randomIndex = Math.floor(Math.random() * gachaPool.length)
  const item = gachaPool[randomIndex]
  rolledItem.value = item
  message.value = `You rolled: ${item.name}! 🎉`

  // OPTIONAL: Save to user's inventory table
  await supabase.from('inventory').insert({
    user_id: user.id,
    gacha_id: item.id,
    obtained_at: new Date().toISOString(),
  })

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
