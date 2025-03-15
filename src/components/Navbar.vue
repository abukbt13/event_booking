
<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import axios from "axios";
import {useRouter} from "vue-router";

const showProfile = ref(false)

const {AuthenticatedUser, currentUser,base_url,storage} = auth()
const first_name = ref('')
const router = useRouter()
function LogOut(){
  localStorage.removeItem('token')
  router.push('/auth/login/');
}
onMounted(()=>{
  AuthenticatedUser()
})

</script>

<template>
  <nav style="background-color: #f8f6f6;" class="navbar sticky-top navbar-expand-lg">
    <div class="container-fluid m-auto">
      <router-link class="navbar-brand text-primary" to="/">EVENTSPHERE</router-link>
      <i style="font-size: 25px" class="d-block d-md-block d-lg-none bi-list"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      </i>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-primary text-uppercase" to="/">Home</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-primary text-uppercase" to="/about">About</router-link>
          </li>
          <div class="d-flex column" v-if="currentUser.first_name">
            <div  class="d-flex column" v-if="currentUser.role === 'admin' ">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link  text-primary" to="/admin/dashboard">Dashboard</router-link>
              </li>
            </div>
            <div  class="" v-else>
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-primary" to="/client/dashboard">Dashboard</router-link>
              </li>
            </div>
            <router-link to="/user/profile" class="nav-item text-uppercase">
              <img height="50" style="border-radius: 50%"  src="/user.png"  alt="">
            </router-link>
          </div>

          <div class="d-flex column flex-md-row flex-lg-row" v-else>
            <li style="background: red;border-radius: 18px;" class="nav-item  text-uppercase">
              <router-link to="/auth/login" class="m-2 text-decoration-none text-primary">LOGIN <i style="font-size: 22px;" @click="LogOut()" class="bi  bi-box-arrow-in-right"></i></router-link>
            </li>

          </div>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

li:hover{
  color: blue;
  cursor: progress;
}
@media screen and (max-width:600px) and (min-height: 250px){
  .column{
    flex-direction: column;
  }
}

</style>