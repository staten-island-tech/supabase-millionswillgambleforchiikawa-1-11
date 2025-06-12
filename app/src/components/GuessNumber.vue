<template>
  <div class="guess-game">
    <p>Guess a number from 1 to 10:</p>
    <input v-model.number="guess" type="number" min="1" max="10" />
    <button @click="submitGuess">Submit</button>
    <p v-if="result">{{ result }}</p>
    <p>Your current balance: {{ money }} coins</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import supabase from '../main' // adjust path to your supabase client
import { useAuthStore } from '../stores/pinia'

const guess = ref<number | null>(null)
const result = ref('')
const money = ref<number>(0)

const authStore = useAuthStore()
const user = authStore.user

// Fetch user's current money on load
const fetchMoney = async () => {
  if (!user) return

  const { data, error } = await supabase.from('profiles').select('money').eq('id', user.id).single()

  if (data) money.value = data.money
  else console.error('Error fetching money:', error)
}

onMounted(fetchMoney)

const submitGuess = async () => {
  if (guess.value === null || guess.value < 1 || guess.value > 10) {
    result.value = 'Please guess a number between 1 and 10.'
    return
  }

  const random = Math.floor(Math.random() * 10) + 1
  if (guess.value === random) {
    result.value = `Correct! You earned 3 coins! 🎉 (Answer: ${random})`
    money.value += 3

    // Update in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({ money: money.value })
      .eq('id', user.id)

    if (error) {
      console.error('Failed to update money:', error.message)
    }
  } else {
    result.value = `Wrong! The correct number was ${random}. Try again!`
  }
}
</script>

<style scoped>
.guess-game {
  font-family: sans-serif;
  padding: 1rem;
  border: 2px solid #ccc;
  border-radius: 1rem;
  max-width: 400px;
  margin: auto;
}
input {
  margin: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 0.5rem;
}
</style>
