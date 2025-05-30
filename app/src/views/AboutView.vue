<template>
  <div class="container">
    <div class="about"></div>
    <img
      src="/ChiikawaIdle.gif"
      alt="Chiikawa"
      class="chiikawa"
      :style="{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }"
    />
    <button class="gachabutton">Gacha</button>
    <button class="inventorybutton">Inventory</button>
    <button class="stickersbutton">Stickers</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const position = ref({ x: 200, y: 200 })
let direction = { x: 1, y: 0 } // initial rightward
const speed = 1.5 // pixels per frame

// We get the container width and height dynamically
const containerWidth = window.innerWidth
const containerHeight = window.innerHeight

function updatePosition() {
  // Update current position based on direction
  position.value.x += direction.x * speed
  position.value.y += direction.y * speed

  // Boundary check (ensure it stays within container bounds)
  if (position.value.x < 0) position.value.x = 0
  if (position.value.x > containerWidth - 200) position.value.x = containerWidth - 200 // Subtract image width (200px)
  if (position.value.y < 0) position.value.y = 0
  if (position.value.y > containerHeight - 200) position.value.y = containerHeight - 200 // Subtract image height (200px)
}

function getRandomDirection() {
  // Random angle for direction
  const angle = Math.random() * 2 * Math.PI
  direction = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }
}

function startWalking() {
  function loop() {
    updatePosition()
    requestAnimationFrame(loop)
  }

  loop()

  // Change direction randomly every 2–4 seconds
  setInterval(
    () => {
      getRandomDirection()
    },
    2000 + Math.random() * 2000,
  )
}

onMounted(() => {
  getRandomDirection()
  startWalking()
})
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
.chiikawa {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform 0.05s linear;
}
</style>
