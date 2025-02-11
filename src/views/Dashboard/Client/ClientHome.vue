<script setup>

import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const title = ref('')
const description = ref('')
const capacity = ref('')
const event_date = ref('')
const  CreateEvent = async () =>{
  const formData = new FormData()
  formData.append('title',title.value)
  formData.append('description',description.value)
  formData.append('capacity',capacity.value)
  formData.append('event_date',event_date.value)
  const res = await axios.post(base_url.value + 'event', formData, authHeader)
  if (res.data.status==='success') {
    // const modalElement = document.getElementById('create_event');
    // const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    // modal.hide();  // Close modal
    await Swal.fire(
        'Success!',
        'Event created successfully',
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

</script>

<template>
  <Navbar />
<div class="d-flex">
  <div class="sidebar">
    <ul class="sidebar-links list-unstyled">

        <router-link class="text-decoration-none" to="/events">  <li> Events</li></router-link>


      <router-link  class="text-decoration-none"  to="/bookings"> <li>Bookings </li></router-link>

    </ul>

  </div>
 <div class="contents d-flex flex-column justify-content-around ">
   <div class="d-flex flex-row justify-content-around">
     <div class="d-flex flex-column">
       <div class="border d-flex flex-column p-4">
         <h2>Events</h2>
         <router-link class="my-2" to="events">Upcoming events</router-link>
         <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create_event">Create</button>
       </div>
     </div>
     <div class="d-flex flex-column">
       <div class="border d-flex flex-column p-4">
         <h2>Bookings</h2>

         <router-link to="/bookings" class="my-2">Book space</router-link>
         <button class="btn btn-primary">view</button>
       </div>
     </div>
   </div>
 </div>
</div>

  <div class="modal fade" id="create_event" tabindex="-1" aria-labelledby="create_eventLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="create_eventLabel">Create event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="CreateEvent">
            <label for="title">Title</label>
            <input type="text" v-model="title" class="form-control" placeholder="Enter title">

            <label for="description" class="mt-2">Description</label>
            <input type="text" v-model="description" class="form-control" placeholder="Enter description">

            <label for="document" class="mt-2">Event Date</label>
            <input type="date"  v-model="event_date" class="form-control">

            <label for="document" class="mt-2">Capacity</label>
            <input type="number"  v-model="capacity" class="form-control">

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