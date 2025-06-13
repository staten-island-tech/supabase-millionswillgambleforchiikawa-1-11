<template>
  <div class="card">
    <img :src="image" :alt="name" class="image" />
    <h1 class="name">{{ name }}</h1>
    <h2 class="rarity">{{ rarity }}</h2>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  rarity: Number,
  image: String,
  description: String,
  index: Number,
})
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
  width: 30rem;
  height: 50rem;
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
