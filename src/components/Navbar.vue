
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
  <nav style="background-color: blue;" class="navbar sticky-top navbar-expand-lg">
    <div class="container-fluid m-auto">
      <router-link class="navbar-brand text-white" to="/">EVENTSPHERE</router-link>
      <i style="font-size: 25px" class="d-block d-md-block d-lg-none bi-list"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      </i>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/">Home</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/about">About</router-link>
          </li>
          <div class="d-flex column" v-if="currentUser.first_name">
            <div  class="d-flex column" v-if="currentUser.role === 1 ">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link  text-white" to="/user/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item text-uppercase">
                <router-link class="nav-link  text-white" to="/admin/admin">Admin</router-link>
              </li>
            </div>
            <div  class="" v-else>
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/user/dashboard">Dashboard</router-link>
              </li>
            </div>
            <router-link to="/user/profile" class="nav-item text-uppercase">
              <img width="50" v-if="!currentUser.picture" style="border-radius: 50%;" height="50"  :src="storage + 'Profiles/'+currentUser.profile"  alt="">
              <img width="50" v-else-if="currentUser.picture"  style="border-radius: 50%;" height="50"  src="/user.png"  alt="">
            </router-link>
          </div>

          <div class="d-flex column flex-md-row flex-lg-row" v-else>
            <li style="background: red;border-radius: 18px;" class="nav-item  text-uppercase">
              <router-link to="/auth/login" class="m-2 text-decoration-none text-white">LOGIN <i style="font-size: 22px;" @click="LogOut()" class="bi  bi-box-arrow-in-right"></i></router-link>
            </li>

          </div>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
li{
  padding-left: 1rem;
}
li:hover{
  padding-left: 1rem;
  background: blue;
  color: white;
  cursor: progress;
}
@media screen and (max-width:600px) and (min-height: 250px){
  .column{
    flex-direction: column;
  }
}

</style>