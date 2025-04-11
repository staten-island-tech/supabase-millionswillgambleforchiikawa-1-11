<script setup lang="ts">
import
</script>

<template>
  <main>
    <div>
      <form action="">
        <div>
          <label for="name">Username: </label>
          <input type="text" name="username" id="name" />
        </div>
        <div>
          <label for="pass">Password: </label>
          <input type="password" name="password" id="pass" />
        </div>
        <button @click="auth.login" id="LogIn" type="submit">Submit</button>
      </form>
    </div>
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
