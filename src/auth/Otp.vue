<script setup>
import axios from "axios"
import{ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {auth} from "@/composables/auth.js";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar.vue";
const {base_url} =auth()
const email=ref('')
const otp=ref('')

const route =useRoute()
email.value=route.params.email
const router = useRouter()
const success=ref('')
const status=ref('')
const handleOtp = async () => {
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('otp', otp.value)

  try {
    const res = await axios.post(base_url.value + 'auth/confirmOtp', formData)

    if (res.data.status === 'success') {
      // alert('found')
      router.push('/auth/reset_password/' + email.value + '/' + otp.value)
    } else {
      Swal.fire('Please Enter Correct OTP', '', 'info')
      status.value = res.data.message
    }
  } catch (error) {
    console.error(error)
    Swal.fire('Something went wrong!', '', 'error')
    status.value = 'Failed to connect to the server.'
  }
}

</script>
<template>
  <Navbar />
  <section class="vh-100">
    <div class="container reset">
      <div class=" d-flex align-content-center justify-content-center align-items-center h-100">
        <form @submit.prevent="handleOtp">
          <div class="bg-danger p-2 text-white" v-if="status">{{status}}</div>
          <h2 class="text-center text-uppercase">Enter OTP received</h2>
          <input style="width: 30rem;" type="number" v-model="otp" class="form-control" placeholder="enter otp"/>
          <button class="btn mt-2 w-100 btn-primary btn-block" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>
<style>
.reset{
  height: 100vh;
}
</style>