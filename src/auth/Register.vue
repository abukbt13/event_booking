
<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {auth} from "@/composables/auth.js";
const router = useRouter()

const {base_url} = auth()

const phone = ref('')
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const c_password = ref('')
const regerror = ref('')


const createAccount =async () => {
  if (email.value == '' && password.value == '') {
    regerror.value = 'Please fill all fields'
  } else if (password.value === c_password.value) {
    const formData = new FormData();
    formData.append('email', email.value)
    formData.append('last_name', last_name.value)
    formData.append('first_name', first_name.value)
    formData.append('phone', phone.value)
    formData.append('password', password.value)
    const res = await axios.post(base_url.value + 'auth/register', formData)
    localStorage.setItem('token', res.data.token)
    if(res.status=== 200) {
      if (res.data.status === 'success') {
        await router.push('/auth/login')
      }
    }
  }
}


</script>

<template>
  <Header />
  <section class="vh-100">
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-danger text-white text-uppercase">{{regerror}}</div>
        <h2 class="text-center">Register here</h2>

        <p>Already have an account? <router-link to="/auth/login">LOGIN</router-link></p>
        <form @submit.prevent="createAccount">


          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">First Name</label>
            <input type="text" class="form-control" v-model="first_name" placeholder="John Mark">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Last Name</label>
            <input type="text" class="form-control" v-model="last_name" placeholder="John Mark">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Phone</label>
            <input type="number" class="form-control" v-model="phone" placeholder="728548760">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="c_password" placeholder="confirm password">
          </div>
          <div class="">
            <button type="submit" class="w-100 btn btn-primary btn-block">Register</button>
          </div>
          <br>

        </form>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

