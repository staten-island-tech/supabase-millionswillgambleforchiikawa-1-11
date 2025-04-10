const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from '@supabase/supabase-js'

async function fetchData() {
  const { data, error } = await supabase.from('User table').select('*')

  if (error) {
    console.error('Error fetching data:', error)
  } else {
    console.log('Data:', data)
  }
}

// Call the fetchData function
fetchData()

export default supabase
