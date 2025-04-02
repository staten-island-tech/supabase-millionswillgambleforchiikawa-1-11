import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { createClient } from '@supabase/supabase-js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router


// Replace with your Supabase URL and Anon Key

const
 supabaseUrl = 
'https://your-project-ref.supabase.co'
;
const
 supabaseAnonKey = 
'your-anon-key'
;
// Create a Supabase client

const
 supabase = createClient(supabaseUrl, supabaseAnonKey);
// Example function to fetch data from a table

async
 
function
 
fetchData
(
) 
{
    
const
 { data, error } = 
await
 supabase
        .from(
'your_table_name'
)
        .select(
'*'
);
    
if
 (error) {
        
console
.error(
'Error fetching data:'
, error);
    } 
else
 {
        
console
.log(
'Data:'
, data);
    }
}
// Call the fetchData function

fetchData();