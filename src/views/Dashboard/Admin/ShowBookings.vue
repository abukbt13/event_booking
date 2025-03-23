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
<!--{{bookings}}-->
  <div class="p-4">
    <table  class="table  border table-hover table-bordered">
      <!-- Table Header -->
      <thead>
      <tr>
        <th colspan="6" class="text-uppercase p-2 text-center">
          <div class=""><div class="">Booking Information</div>
            <!--          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#venue">Create</button>-->
          </div>
        </th>
      </tr>
      </thead>
      <tbody>

      <tr>
        <th class="border">Venue</th>
        <th class="border">Date </th>
        <th class="border">Start Time </th>
        <th class="border">End Time </th>
        <th class="border">Payment Status </th>
      </tr>
      <!-- Table Rows (Generated dynamically using Vue.js) -->
      <tr v-for="booking in bookings" :key="booking">
        <td class="border">{{ booking.venue }} </td>
        <td class="border">{{ booking.date }} </td>
        <td class="border">{{ booking.start_time }}</td>
        <td class="border">{{ booking.end_time }}</td>
        <td v-if="booking.status ==='booked'" class="border">
          Paid
        </td>
        <td v-else>
          Pending
        </td>
        <td class="border">
          <button @click="populateEvent(event)"   class="btn bg-secondary  btn-sm" data-bs-toggle="modal" data-bs-target="#event_view">View</button>
        </td>
      </tr>

      </tbody>
    </table>

  </div>

</template>

<style scoped>

</style>