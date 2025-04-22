<script setup lang="ts">
import supabase from '../main'
</script>

<template>
  <div class="box">
    <form action="">
      <div>
        <label for="name">Username: </label>
        <input type="text" name="username" id="name" />
      </div>
      <div>
        <label for="pass">Password: </label>
        <input type="password" name="password" id="pass" />
      </div>
      <button @click="supabase.auth.signInAnonymously" id="log-in" type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.box {
  background-color: aquamarine;
}
</style>
