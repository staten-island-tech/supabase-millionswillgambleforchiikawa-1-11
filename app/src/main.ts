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

const supabaseUrl = "https://mkumryudrsvmgwhydnxl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdW1yeXVkcnN2bWd3aHlkbnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDkxNjUsImV4cCI6MjA1OTE4NTE2NX0.ZZJ9_gEdXDP818MGRU7j0r7aKWlVtEY0ZAcq024aKY8"
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
