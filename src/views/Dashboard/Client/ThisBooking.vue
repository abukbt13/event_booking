<script setup>


import axios from "axios";
import {auth} from "@/composables/auth.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Swal from "sweetalert2";
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
const confirmCancelBooking = async (bookingId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to cancel this booking. This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, cancel it!',
    cancelButtonText: 'No, keep it'
  });

  if (result.isConfirmed) {
    CancelBooking(bookingId);
  }
};
const CancelBooking = async (bookingId) => {
  try {
    const res = await axios.delete(`${base_url.value}booking/${bookingId}`, authHeader);
    if (res.data.status === 'success') {
      await Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      // Optionally refresh bookings list here
    } else {
      Swal.fire('Error!', 'Could not cancel booking.', 'error');
    }
  } catch (error) {
    Swal.fire('Error!', 'Something went wrong.', 'error');
  }
};


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
          <button class="btn btn-success">Pending</button>
         <button v-if="book.status ==='active'" class="btn btn-success ">Active</button>
         <button v-if="book.status ==='completed'" class="btn btn-success">Completed</button>
        </div>
        <div class="border">
          <button @click="confirmCancelBooking(book.id)" class="btn btn-danger text-white">Cancel This Booking</button>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>