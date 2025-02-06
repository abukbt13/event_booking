<script setup>
import axios from "axios"
import {ref} from "vue";
import {auth} from "@/composables/auth.js";
import {useRoute, useRouter} from "vue-router";
const password = ref('')
const email = ref('')
const otp = ref('')
const c_password = ref('')
const status = ref('')
const router = useRouter();
const route = useRoute();
const {base_url} = auth()
otp.value = route.params.otp
email.value = route.params.email
const resetPassword = async()=>{
  // alert('')
  if(password.value !== c_password.value){
    status.value = "Passwords do not match"
    return
  }
  const formData = new FormData()
  formData.append('password',password.value)
  const res=await axios.post(base_url.value+'auth/finish_reset/'+email.value+'/'+otp.value,formData)
  if(res.status===200){
    if(res.data.status==='success'){
    await  router.push('/auth/login')
    }
    else{
      status.value=res.data.message
    }
  }
}

</script>
<template>
  <section class="vh-100">
    <div class="container reset">
      <div class=" d-flex align-content-center justify-content-center align-items-center h-100">
        <form @submit.prevent="resetPassword">
          <h3> Reset password here</h3>
          <h5 class="h5 p-2 bg-danger text-uppercase" v-if="status" >{{status}}  !</h5>
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