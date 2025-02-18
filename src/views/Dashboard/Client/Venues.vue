<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const venues =ref([])

const  getVenues= async () => {
  const res = await axios.get(base_url.value + 'venue', authHeader)
  if(res){
    venues.value = res.data.venues
  }
}
onMounted(()=>{
  getVenues()
})
</script>

<template>
  <Navbar />
<!--  {{venues}}-->
  <div class="events" >
    <div class="border w-25 m-3 p-2" v-for="venue in venues" :key="venue">
       <h3 class="text-center">{{venue.venue}}</h3>
       <p class="text-center">Location :{{venue.location}}</p>
       <div class="text-center" ><button class="btn btn-primary">More details</button></div>

     </div>
  </div>

</template>

<style scoped>
.events{
  display: flex;

  background: yellow;
}
</style>