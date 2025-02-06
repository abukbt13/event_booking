<script setup>
import axios from "axios"
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";

import {auth} from "@/Composables/auth.js";
import Header from "@/components/Header.vue";
const {base_url} =auth()
const password=ref('')
const c_password=ref('')
const otp= ref('')
const route =useRoute()
const router = useRouter()
// alert(otp.value)
const email = ref ('')
email.value = route.params.email
const status = ref ('')
const reset = ref ('')
const enterotp = ref('')
otp.value=route.params.id

const checkOtp = async()=>{
  const formData = new FormData()
  formData.append('email',email.value)
  formData.append('otp',otp.value)
  const res=await axios.post(base_url.value+'auth/confirmOtp',formData)
  if(res.data.status==='success'){
    reset.value = 'true'
    enterotp.value = 'false'
    // await router.push('/auth/reset_password')
  }
  else {
    alert('something went wrong')
  }

}
const resetPassword = async()=>{
  const formData = new FormData()
  formData.append('email',email.value)
  formData.append('otp',otp.value)
  formData.append('password',password.value)
  // if(password !== c_password) {
  //   return status.value = 'Passwords do not match';
  // }

  const res=await axios.post(base_url.value+'auth/finish_reset',formData)
  if(res.status===200){
    if(res.data.status==='success'){
      // success.value=res.data.message
     await router.push('/auth/login')
    }
    else{
      status.value=res.data.message
    }
  }
}

</script>

<template>
  <Header />
  <section class="vh-100">
    <div class="container reset">

      <div class="d-flex  align-content-center justify-content-center align-items-center h-100">
        <div v-if="!enterotp" class="">
          <div class="" v-if="status">{{status}}</div>
          <form @submit.prevent="checkOtp">
          <p>Enter Otp You received on your phone You registered with</p>
          <input type="text" v-model="otp" class="form-control">
          <button type="submit" class="btn mt-2 btn-primary">Confirm</button>
          </form>
        </div>
      </div>
      <div v-if="reset" class="d-flex  align-content-center justify-content-center align-items-center h-100">
        <form @submit.prevent="resetPassword">

          <div class="" v-if="status">{{status}}</div>
          <h3> Reset password here</h3>
          <div class="form-group">
          <label>Password</label>
            <input type="password" class="form-control" v-model="password">
            <label for="">Confirm Password</label>
            <input type="password" class="form-control" v-model="c_password">
            <button class="btn mt-2 w-100 btn-primary btn-block" type="submit">Reset</button>
          </div>
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