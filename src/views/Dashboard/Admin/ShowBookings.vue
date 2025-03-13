<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import Navbar from "@/components/Navbar.vue";
import {auth} from "@/composables/auth.js";
const {authUser, authHeader,base_url,storage} = auth()


const bookings = ref([])
const  getBookings= async () => {
  const res = await axios.get(base_url.value + 'admin/show/bookings', authHeader)
  if(res){
    bookings.value = res.data.bookings
  }
}
onMounted(()=>{
  getBookings()
})
</script>

<template>
  <Navbar />
{{bookings}}
</template>

<style scoped>

</style>