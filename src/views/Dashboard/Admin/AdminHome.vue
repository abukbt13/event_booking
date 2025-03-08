<script setup>

import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const venues = ref([])
const venue = ref('')
const venue_location = ref('')
const capacity = ref('')
const description = ref('')
const amenities = ref('')
const price_per_hour = ref('')
const contact_email = ref('')
const contact_phone = ref('')
const  CreateEvent = async () =>{
  const formData = new FormData()
  formData.append('venue',venue.value)
  formData.append('location',venue_location.value)
  formData.append('capacity',capacity.value)
  formData.append('description',description.value)
  formData.append('amenities',amenities.value)
  formData.append('price_per_hour',price_per_hour.value)
  formData.append('contact_email',contact_email.value)
  formData.append('contact_phone',contact_phone.value)
  const res = await axios.post(base_url.value + 'venue', formData, authHeader)
  if (res.data.status==='success') {
   await getVenues()
    // const modalElement = document.getElementById('venue');
    // const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    // modal.hide();  // Close modal
    await Swal.fire(
        'Success!',
        'venue created successfully',
        'success'
    );
  } else {
    Swal.fire(
        'Failed!',
        'Something went wrong. Try again later.',
        'error' // Changed to 'error' for better context
    );

  }

}
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
  <div class="d-flex">
    <div class="sidebar">
      <ul class="sidebar-links list-unstyled">

        <router-link class="text-decoration-none" to="/events">  <li> Venues</li></router-link>
        
      </ul>

    </div>
    <div class="contents mx-2 ">
      <table  class="table mt-1 border table-hover table-bordered">
        <!-- Table Header -->
        <tr>
          <th colspan="6" class="text-uppercase">
            <div class="d-flex justify-content-between"><div class="">Venues</div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#venue">Create</button>
            </div>
          </th>
        </tr>
        <tr>
          <th class="border">venue</th>
          <th class="border">location </th>
          <th class="border">capacity</th>
          <th class="border">Action</th>
        </tr>
        <!-- Table Rows (Generated dynamically using Vue.js) -->
        <tr v-for="ven in venues" :key="ven">
          <td class="border">{{ ven.venue }} </td>
          <td class="border">{{ ven.location }}</td>
          <td class="border">{{ ven.capacity }}</td>
          <td class="border"><button class="btn bg-primary btn-primary">View more</button></td>
         </tr>

      </table>

    </div>
  </div>

  <div class="modal fade" id="venue" tabindex="-1" aria-labelledby="venueLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="venueLabel">Create Venue</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="CreateEvent">
            <label for="title">Venue Name</label>
            <input type="text" v-model="venue" class="form-control" placeholder="Enter venue">

            <label for="description" class="mt-2">location</label>
            <input type="text" v-model="venue_location" class="form-control" placeholder="Enter location">

            <label for="description" class="mt-2">Description</label>
            <input type="text" v-model="description" class="form-control" placeholder="Enter description">

            <label for="document" class="mt-2">Venue Capacity</label>
            <input type="number"  v-model="capacity" class="form-control">

            <label for="document" class="mt-2">amenities</label>
            <input type="text"  v-model="amenities" class="form-control">

            <label for="document" class="mt-2">Capacity</label>
            <input type="number"  v-model="capacity" class="form-control">

            <label for="document" class="mt-2">price_per_hour</label>
            <input type="number"  v-model="price_per_hour" class="form-control">

            <label for="document" class="mt-2">contact_email</label>
            <input type="text"  v-model="contact_email" class="form-control">

            <label for="document" class="mt-2">Contact_Phone</label>
            <input type="contact_phone"  v-model="contact_phone" class="form-control">
            <div class="d-flex justify-content-around mt-3">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>
.sidebar-links{
  background: darkslategray;
  height: 100vh;
}
.sidebar-links li{
  padding: 1rem 1rem 1rem 1rem;
}
.sidebar-links li:hover{
  background: #f6f3f3;
  text-transform: uppercase;
}
.sidebar{
  width: 20%;
}
.contents{
  width: 80%;
  height: 50vh;
}
</style>