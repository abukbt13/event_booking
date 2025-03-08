<script setup>


import axios from "axios";
import {auth} from "@/composables/auth.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const event_id = ref('')
const book = ref([])
const route = useRoute();
event_id.value = route.params.id


const  getBooking= async () => {
  const res = await axios.get(base_url.value + 'book/'+event_id.value, authHeader)
  if(res){
    book.value = res.data.booking
  }
}

onMounted(()=>{
  getBooking()
})
</script>

<template>
  <Navbar />

<!--  {{book}}-->
  <div class="d-flex flex-column align-items-center">

    <div class="card text-center w-50">
      <div class="card-header">
        Booking Details
      </div>
      <div class="card-body">
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">Venue</h5>
          <p class="text-start">{{ book.venue }}</p>
        </div>
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">Event date</h5>
          <p class="text-start">{{ book.date }}</p>
        </div>
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">Price Per Hour</h5>
          <p class="text-start">{{ book.price_per_hour }}</p>
        </div>
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">Start Time</h5>
          <p class="text-start">{{ book.start_time }}</p>
        </div>
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">End Time</h5>
          <p class="text-start">{{ book.end_time }}</p>
        </div>
        <div class="border p-2 m-2">
          <h5 class="text-start text-uppercase">Total Price</h5>
          <p class="text-start">{{ book.total_price }}</p>
        </div>
        <div class="border p-2 m-2">
         <router-link :to="'/checkout/'+book.id" v-if="book.status ==='pending'" class="btn btn-success">Proceed to Checkout</router-link>
         <button v-if="book.status ==='booked'" class="btn btn-success ">Booked</button>
         <button v-if="book.status ==='completed'" class="btn btn-success">Completed</button>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>