<script setup lang="ts">
import SignIn from '@/components/SignIn.vue'
import CreateAccount from '@/components/CreateAccount.vue'
</script>

<template>
  <main>
    <SignIn></SignIn>
    <CreateAccount></CreateAccount>
  </main>
</template>

<!--
typescript
- defines interfaces
- clear defs of interfaces


instead of fetch itll be supabase

manage login using authstore*
and pinia
pinia
- state managment 
-state is data accesible thorughout app
   - like login
   -any


store anything thats auth in a auth file
bring in authstore in app vue

meta = data from outside of router
vuerouter to find docs and pinia





-->
