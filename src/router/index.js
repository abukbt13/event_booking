import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/auth/Login.vue";
import ForgotPassword from "@/auth/ForgotPassword.vue";
import Otp from "@/auth/Otp.vue";
import ResetPassword from "@/auth/ResetPassword.vue";
import Register from "@/auth/Register.vue";
import clientsroutes from './client.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...clientsroutes,
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/auth/login',
      component: Login
    },
    {
      path: '/auth/register',
      component: Register
    },
    {
      path: '/auth/forget-password',
      component: ForgotPassword
    },
    {
      path: '/auth/otp/:email',
      component: Otp
    },
    {
      path: '/auth/reset_password/:email/:otp',
      component: ResetPassword
    },
  ],
})

export default router
