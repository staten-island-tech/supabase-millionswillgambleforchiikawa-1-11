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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


async function fetchData() {
  const { data, error } = await supabase.from('usertable').select('id')

  if (error) {
    console.error('Error fetching data:', error)
  } else {
    console.log('Data:', data)
  }
}

// Call the fetchData function
fetchData()

export default supabase
