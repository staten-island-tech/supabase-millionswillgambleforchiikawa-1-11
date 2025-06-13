<!-- //Button_Nav.vue -->
<template>
  <html lang="en">
    <div>
      <router-link to="/gacha">
        <button class="gachabutton">Gacha</button>
      </router-link>

      <router-link to="/inventory">
        <button class="inventorybutton">Inventory</button>
      </router-link>

      <router-link to="/index">
        <button class="indexbutton">Index</button>
      </router-link>
      <ChiikawaWalk></ChiikawaWalk>
    </div>
  </html>
</template>

<script setup>
import ChiikawaWalk from '../components/ChiikawaWalk.vue'
</script>

<style scoped>
button {
  font-size: 2rem;
}
.chiikawa {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform 0.05s linear;
}
</style>
