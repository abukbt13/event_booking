<script setup>

import Navbar from "@/components/Navbar.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router/index.js";
import {auth} from "@/composables/auth.js";
const {authUser, authHeader,base_url,storage} = auth()

const event_id = ref('')
const venue_id = ref('')
const route = useRoute();
event_id.value = route.params.id
venue_id.value = route.params.venue_id
const start_time =ref('')
const end_time =ref('')
const event_date =ref('')
const capacity =ref('')
const venues_data =ref({})
const venues =ref([])
const  getVenues= async () => {
  const res = await axios.get(base_url.value + 'show/venues/'+venue_id.value, authHeader)
  if(res){
    venues.value = res.data.venue
  }
}
const Bookvenue = async (venue) => {
  // Get the current date and time
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
  const currentTime = now.toTimeString().split(" ")[0]; // Current time in HH:mm:ss format

  // Validate event date
  if (new Date(event_date.value) < new Date(currentDate)) {
    await Swal.fire("Error", "The event date must be today or a future date.", "error");
    return;
  }

  // If the event date is today, validate the time
  if (event_date.value === currentDate) {
    if (start_time.value <= currentTime) {
      await Swal.fire("Error", "The start time must be greater than the current time.", "error");
      return;
    }
  }

  // Validate end time
  if (end_time.value <= start_time.value) {
    await Swal.fire("Error", "The end time must be greater than the start time.", "error");
    return;
  }

  // Calculate the total time in minutes
  const startDateTime = new Date(`${event_date.value}T${start_time.value}`);
  const endDateTime = new Date(`${event_date.value}T${end_time.value}`);
  const timeDifference = (endDateTime - startDateTime) / 1000 / 60; // Difference in minutes

  const price_per_minute = venue.price_per_hour/60
  // Calculate the total price
  const totalPrice = timeDifference * price_per_minute

  // If validation passes, proceed with booking
  const formData = new FormData();
  formData.append("start_time", start_time.value);
  formData.append("end_time", end_time.value);
  formData.append("event_date", event_date.value);
  formData.append("capacity", capacity.value);
  formData.append("venue_id", venue.id);
  formData.append("price_per_hour", venue.price_per_hour);
  formData.append("total_price", totalPrice); // Include the calculated total price
   // console.log('totalPrice')
   // console.log(totalPrice)
   // console.log('PerMinute')
   // console.log(price_per_minute)
   // console.log('price per Hour')
   // console.log(venue.price_per_hour)
   // console.log('Total Minutes')
   // console.log(timeDifference)
  try {
    const res = await axios.post(base_url.value + 'event/bookings/' + event_id.value, formData, authHeader) //api call

    if (res.status === 200 && res.data.status === "success") {
      await Swal.fire(
          "Success!",
          "Venue booked successfully. Proceed to checkout.",
          "success"
      );
      // await router.push(`/checkout/${res.data.booking.id}`);

    }
  }
    catch (error) {
    console.error("Booking error:", error);
    await Swal.fire("Error", "Failed to book the venue. Please try again.", "error");
  }
};
onMounted(()=>{
  getVenues()
  authUser()
})
</script>

<template>
  <Navbar />
<!--  {{venues}}-->
  <div class="d-flex align-items-center justify-content-center">
  <div class="border p-2">
    <h4 class="text-center border-bottom">Venue Details</h4>
    <div class="p-4">
      <h3>Venue</h3>
      <p class="p-1 text-info">
        {{ venues.venue }}
      </p>

      <h2></h2>
      <h3>Description</h3>
      <p class="p-1 text-info">
        {{ venues.description }}
      </p>

      <h3>Maximum number of people it can hold</h3>
      <p class="p-1 text-info">
        {{ venues.capacity }} People
      </p>

      <h3>Amenities</h3>
      <p class="p-1 text-info">
        {{ venues.amenities }}
      </p>
      <h3>Price per hour</h3>
      <p class=" p-1 text-info">
        Ksh. {{ venues.price_per_hour }}
      </p>

      <h3>Contact Email</h3>
      <p class=" p-1 text-info">
        {{ venues.contact_email }}
      </p>
      <h3>Contact Phone</h3>
      <p class=" p-1 text-info">
        {{ venues.contact_phone }}
      </p>
    </div>

    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary float-end m-1">Book</button>

  </div>
</div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Booking Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
         <form @submit.prevent="Bookvenue(venues)">
           <div class="modal-body">
             <h5>Event date</h5>
             <input type="date" class="form-control" v-model="event_date">

             <h5>Start Time</h5>
             <input type="time" class="form-control"  v-model="start_time">
             <h5>End Time</h5>
             <input type="time" class="form-control"  v-model="end_time">
             <h5>Number Of People</h5>
             <input type="number" class="form-control"  v-model="capacity">
           </div>
           <div class="m-4">
             <button type="submit" class="btn btn-danger float-end m-3">Checkout</button>
           </div>
         </form>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>