
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const email = ref('')
const password = ref('')

import {auth} from "@/composables/auth";
import Navbar from "@/components/Navbar.vue";
const {base_url,authHeader} = auth()

const unique_id = ref(null)
const regerror = ref(null)
const logging = ref(true)

const login =async () => {
  if(email.value=='' && password.value==''){
    regerror.value = 'Please fill all fields'
  }
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('password', password.value)
  const res = await axios.post(base_url.value+'auth/login',formData) //api call
  if(res.status=== 200) {
    if (res.data.user.role === 'client') {
      localStorage.setItem('token', res.data.token);

        await router.push('/client/dashboard')

    }
    else if(res.data.user.role === 'admin') {
      localStorage.setItem('token', res.data.token);

      await router.push('/admin/dashboard')
    }
    else if(res.data.user.role === 'admin') {
      logging.value =true
      regerror.value = res.data.message;
    }

  }else{
    logging.value =true
    regerror.value ="Error in network"
  }


}


</script>

<template>
  <section class="vh-75">
<Navbar />

    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">

        <div class="error text-center bg-danger text-white text-uppercase">{{unique_id}}</div>
        <h2 class="text-center text-uppercase">Login Page</h2>
        <p>Don't have an account? <router-link to="/auth/register">Register</router-link></p>
        <div class="error text-center bg-danger text-white text-uppercase p-2" v-if="regerror">{{regerror + ' !'}}</div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter your email here">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password">
          </div>
          <div class="">
            <button @click="logging = false" type="submit" v-show="logging" class="w-100 btn btn-primary btn-block">Login</button>
            <div class="">
              <h3 v-if="logging ===false" class="d-flex justify-content-between">Verifying  ...
                <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </h3>
            </div>
          </div>
          <br>
        </form>
        <p>Don't remember password? <router-link to="/auth/forget-password">Reset Now</router-link></p>

      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

