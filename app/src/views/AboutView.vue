<template>
  <div class="container">
    <div class="about">
      <ChiikawaWalk></ChiikawaWalk>
    </div>
  </div>
</template>

<script setup>
import ChiikawaWalk from '@/components/ChiikawaWalk.vue'
</script>
<style>
body {
  min-height: 100dvh;
  background: url(https://i.pinimg.com/236x/dc/ff/0c/dcff0c4e41a322e809e148396886118e.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.container {
  position: relative;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
}
</style>
