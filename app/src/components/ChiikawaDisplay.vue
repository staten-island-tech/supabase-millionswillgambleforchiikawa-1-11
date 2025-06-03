<template>
  <ChiikawaCard
    v-for="(item, index) in gachaPool"
    :key="index"
    :name="item.name"
    :rarity="item.rarity"
    :image="item.image"
    :description="item.description"
  />
</template>

<script setup lang="ts">
import { gachaPool } from '../stores/ChiikawaInfo' // ✅ Make sure this path is correct

import ChiikawaCard from './ChiikawaCards.vue'
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
}

.card {
  border-radius: 1.5rem;
  border-width: 1rem;
  width: 25rem;
  height: 45rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1rem groove;
  border-color: black;
  background-color: white;
}

.name {
  font-size: 2.5rem;
  color: rgb(13, 54, 51);
  margin-left: 0.3rem;
  font-weight: bold;
  text-align: center;
}

.rarity {
  font-size: 2rem;
  color: rgb(13, 107, 101);
}

.description {
  font-size: 1.5rem;
  color: rgb(13, 107, 101);
  padding: 1rem;
  text-align: center;
}

.image {
  height: 25rem;
  width: auto;
  object-fit: contain;
  margin: 0.3rem;
}
</style>
