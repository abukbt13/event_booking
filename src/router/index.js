import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import clientsroutes from './client.js'
import adminsroutes from './admin.js'
import authroutes from './auth.js'
import clientroutes from './client.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...clientsroutes,
      ...adminsroutes,
      ...authroutes,
      ...clientsroutes,

    {
      path: '/',
      component: HomeView,
    }
  ],
})

export default router
