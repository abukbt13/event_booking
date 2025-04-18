<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import Navbar from "@/components/Navbar.vue";
import {auth} from "@/composables/auth.js";
const {authUser, authHeader,base_url,storage} = auth()

const booking_data = ref([])
const bookings = ref([])
const  getBookings= async () => {
  const res = await axios.get(base_url.value + 'admin/show/bookings', authHeader)
  if(res){
    bookings.value = res.data.bookings
  }
}
const populateBookingData = (data) => {
  booking_data.value = data
}
onMounted(()=>{
  authUser()
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
        <td class="border">{{ booking.venue_name }} </td>
        <td class="border">{{ booking.date }} </td>
        <td class="border">{{ booking.start_time }}</td>
        <td class="border">{{ booking.end_time }}</td>
        <td v-if="booking.payment_status ===1" class="border">
          Completed
        </td>
        <td v-else>
          Pending
        </td>
        <td class="border">
          <button @click="populateBookingData(booking)"   class="btn bg-secondary  btn-sm" data-bs-toggle="modal" data-bs-target="#bookings">View</button>
        </td>
      </tr>

      </tbody>
    </table>

  </div>



  <div class="modal fade modal-dialog-scrollable" id="bookings" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
<!--                    {{booking_data}}-->
          <h1 class="modal-title fs-5" id="exampleModalLabel">Bookings Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-4">


          <div class="border p-2">
            <h2>Clients Info</h2>
            <div class="p-2"><h4>Client Name:</h4> {{booking_data.first_name}} {{booking_data.last_name}}</div>
            <div class="p-2"><h4>Client Phone:</h4> {{booking_data.phone}} </div>

          </div>

          <h3>Venue</h3>
          <div class="border p-2">{{booking_data.venue_name}}</div>

          <h3>Capacity</h3>
          <div class="border p-2">{{booking_data.capacity}} People</div>

          <h3>Price Per Hour</h3>
          <div class="border p-2">Ksh . {{booking_data.price_per_hour}}</div>

          <h3>Total Price</h3>
          <div class="border p-2">Ksh . {{booking_data.total_price}}</div>

          <h4>Event Date</h4>
          <div class="border p-2">{{booking_data.date}}</div>

          <h4>Start Time</h4>
          <div class="border p-2">{{booking_data.start_time}}</div>

          <h4>End Time</h4>
          <div class="border p-2">{{booking_data.end_time}}</div>
          <h4>Payment Status</h4>
          <div class="border bg-danger p-2 text-center text-uppercase">{{booking_data.status}}</div>

          <h4>Booking Status</h4>
          <div v-if="booking_data.status === 'pending'" class="border bg-info p-2 text-white text-center text-uppercase">Pending</div>
          <div v-else class="border bg-info p-2 text-center text-uppercase">Completed</div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>