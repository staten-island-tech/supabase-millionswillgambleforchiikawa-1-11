// main.ts
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import
 { createClient } from'@supabase/supabase-js';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const supabaseUrl = "https://fpzsqqzlfazfgmtapujs.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwenNxcXpsZmF6ZmdtdGFwdWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDkyNzgsImV4cCI6MjA2NDAyNTI3OH0.cxF-PIJvd2r4wgY1upD4Rra6lQxtqjpKa1-imCaEeWk"
const supabase = createClient(supabaseUrl, supabaseKey)


async function fetchData() {
  const { data, error } = await supabase.from('usertable').select('*')

  if (error) {
    console.error('Error fetching data:', error)
  } else {
    console.log('Data:', data)
  }
}

// Call the fetchData function
fetchData()

export default supabase 
