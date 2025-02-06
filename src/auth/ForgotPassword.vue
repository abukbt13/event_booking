<script setup>
    import axios from "axios"
    import{ref} from 'vue'
    import {useRouter} from "vue-router";
    import {auth} from "@/composables/auth.js";
    import Navbar from "@/components/Navbar.vue";
    const {base_url} =auth()
    const email=ref('')
    const error=ref('')
    const router = useRouter()
    const success=ref('')
    const handleForgotPassword = async()=>{
      const formData = new FormData()
      formData.append('email',email.value)
        const res=await axios.post(base_url.value+'auth/forget_password',formData)
      if(res.status===200){
          if(res.data.status==='success'){
            await router.push('/auth/otp/'+email.value)
            // success.value=res.data.status
          }
          else{
            error.value=res.data.message
          }
      }
    }
</script>
<template>
  <Navbar />
<section class="vh-100">
 <div class="container reset ">
   {{success}}
    <div class=" d-flex align-content-center justify-content-center align-items-center h-100">
          <form @submit.prevent="handleForgotPassword">
                <div v-if="error" style="background: red; padding:0.4rem;" class="error">{{error}}</div>
                <div v-if="success" style="background: blue; color:white; padding:0.4rem;" class="error">{{success}}</div>
                  <h2 class="text-center text-uppercase">Enter Your email</h2>
                  <input style="width: 30rem;" type="email" v-model="email" class="form-control" placeholder="email"/>
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