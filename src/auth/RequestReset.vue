
<script setup>
import {onMounted, ref} from "vue";
// import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const email = ref('')
const password = ref('')

import {auth} from "@/composables/auth";
import Header from "@/components/includes/Header.vue";
const {base_url,authHeader} = auth()

const unique_id = ref(null)
const regerror = ref(null)

// const login =async () => {
//   if(email.value=='' && password.value==''){
//     regerror.value = 'Please fill all fields'
//   }
//   const formData = new FormData();
//   formData.append('email', email.value)
//   formData.append('password', password.value)
//   const res = await axios.post(base_url.value+'auth/login',formData)
//   if(res.status=== 200) {
//     if (res.data.status === 'success') {
//       localStorage.setItem('token', res.data.token);
//
//       const unique_id = ref(res.data.user.id);
//       await router.push('/verify/' + unique_id.value);
//
//     }
//     else if(res.data.status === 'failed') {
//       regerror.value = res.data.message;
//     }
//
//   }else{
//     regerror.value ="Error in network"
//   }
//
//
// }


</script>

<template>
  <Header />
  <section style="height: 50vh;" class="">
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-danger text-white text-uppercase p-2" v-if="regerror">{{regerror + ' !'}}</div>

        <div class="error text-center bg-danger text-white text-uppercase">{{unique_id}}</div>
        <h4 class="text-center text-uppercase">Enter your Email To request OTP </h4>
        <form @submit.prevent="RequestOtp">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter your email here">
          </div>


          <div class="">
            <button type="submit" class="w-100 btn btn-primary btn-block">Continue</button>
          </div>
          <br>
        </form>

      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

