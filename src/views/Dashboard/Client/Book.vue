<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import {useRoute} from "vue-router";
const {authUser, authHeader,base_url,storage} = auth()
const venues =ref([])
const start_time =ref('')
const end_time =ref('')
const event_date =ref('')
const capacity =ref('')
const venues_data =ref({})
const event_id = ref('')
const route = useRoute();
event_id.value = route.params.id
const  getVenues= async () => {
  const res = await axios.get(base_url.value + 'venue', authHeader)
  if(res){
    venues.value = res.data.venues
  }
}
const populateVenues = (data) => {
  venues_data.value = data
}
const Bookvenue =async (booking_data) => {

  const formData = new FormData();
  formData.append('start_time', start_time.value)
  formData.append('end_time', end_time.value)
  formData.append('event_date', event_date.value)
  formData.append('capacity', capacity.value)
  formData.append('venue', booking_data.venue)
  formData.append('venue_id', booking_data.id)
  formData.append('price_per_hour', booking_data.price_per_hour)
  formData.append('total_price', 70)
  console.log(formData)
  console.log(booking_data.id)
  const res = await axios.post(base_url.value + 'event/bookings/'+event_id.value, formData,authHeader) //api call
  if (res.status === 200) {
    if (res.data.status === 'success') {
      alert('successfully booked')
    }
  }
}

onMounted(()=>{
  getVenues()
  authUser()
})
</script>

<template>
  <Navbar />
<!--  {{venues}}-->
  <div class="home" >
    <div class="events">
      <div class="border  m-3 p-2" v-for="venue in venues" :key="venue">
        <h3 class="text-center">{{venue.venue}}</h3>
        <p class="text-center">Location :{{venue.location}}</p>
        <div class="text-center" ><button @click="populateVenues(venue)" data-bs-toggle="modal" data-bs-target="#venue_view" class="btn btn-primary">More details</button></div>
      </div>
    </div>

  </div>
  <div class="modal fade" id="venue_view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Venue Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-4">
                    ddd{{venues_data}}
          <form @submit.prevent="Bookvenue(venues_data)">
           <h3>Title</h3>
            <p class="p-1 text-info">
              {{ venues_data.venue }}
            </p>

          <h2></h2>
            <h3>Description</h3>
            <p class="p-1 text-info">
              {{ venues_data.description }}
            </p>

            <h3>Maximum number of people it can hold</h3>
              <p class="p-1 text-info">
                {{ venues_data.capacity }} People
              </p>

            <h3>Amenities</h3>
            <p class="p-1 text-info">
              {{ venues_data.amenities }}
            </p>
            <h3>Price per hour</h3>
            <p class=" p-1 text-info">
             Ksh. {{ venues_data.price_per_hour }}
            </p>

            <h3>Contact Email</h3>
            <input type="email" class="form-control" v-model="venues_data.contact_email">
            <h3>Contact Phone</h3>
            <input type="email" class="form-control" v-model="venues_data.contact_email">

         <h1 class="text-center">Enter your Details to book</h1>

          <h3>Event date</h3>
          <input type="date" class="form-control" v-model="event_date">

          <h3>Start Time</h3>
          <input type="time" class="form-control" v-model="start_time">
          <h3>End Time</h3>
          <input type="time" class="form-control" v-model="end_time">
           <h3>Number Of People</h3>
          <input type="number" class="form-control" v-model="capacity">


          <div class="d-flex justify-content-around mt-2">
            <button type="submit" data-bs-dismiss="modal" class="btn bg-primary">Book venue</button>
            <button data-bs-dismiss="modal" class="btn bg-danger">Close </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.home{
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}
.events{

  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
@media screen and (min-width: 400px) and (max-height: 600px) {
  .events{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>