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
    </div>
  </html>
</template>

<script setup></script>

<style scoped>
button {
  font-size: 2rem;
}
</style>
