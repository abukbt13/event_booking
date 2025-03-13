<script setup>


import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const venues = ref([])
const bookings = ref([])
const venue = ref('')
const venue_location = ref('')
const capacity = ref('')
const description = ref('')
const amenities = ref('')
const price_per_hour = ref('')
const contact_email = ref('')
const contact_phone = ref('')


// Sidebar state
const isSidebarOpen = ref(false);
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
  const res = await axios.post(base_url.value + 'admin/venue', formData, authHeader)
  if (res.data.status==='success') {
    await getVenues()
    const modalElement = document.getElementById('venue');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();  // Close modal
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
  const res = await axios.get(base_url.value + 'show/venues', authHeader)
  if(res){
    venues.value = res.data.venues
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
onMounted(()=>{
  getVenues()
})
</script>

<template>
  <Navbar />

  <!-- Sidebar Toggle Button -->
  <i
      :class="['bi', isSidebarOpen ? 'bi-x-lg' : 'bi-list-nested', 'open']"
      style="font-size: 30px; cursor: pointer"
      @click="toggleSidebar"
  ></i>
  <div class="d-flex">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <ul class="sidebar-links list-unstyled">
        <router-link class="text-decoration-none" to="/admin/events">  <li> Venues</li></router-link>
        <router-link class="text-decoration-none" to="/admin/bookings">  <li> Bookings</li></router-link>
      </ul>
    </div>

    <!-- Content -->
    <div class="contents">
      <table  class="table mt-1 border table-hover table-bordered">
        <!-- Table Header -->
        <thead>

        <tr>
          <th colspan="6" class="text-uppercase">
            <div class="d-flex justify-content-between"><div class="">Venues</div>
              <button class="btn btn-primary me-4" data-bs-toggle="modal" data-bs-target="#venue">Create</button>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>

        <tr>
          <td class="border">venue</td>
          <td class="border">location </td>
          <td class="border">capacity</td>
          <td class="border">Action</td>
        </tr>
        <!-- Table Rows (Generated dynamically using Vue.js) -->
        <tr v-for="ven in venues" :key="ven">
          <td class="border">{{ ven.venue }} </td>
          <td class="border">{{ ven.location }}</td>
          <td class="border">{{ ven.capacity }}</td>
          <td class="border"><button class="btn bg-primary btn-primary">View more</button></td>
        </tr>
        </tbody>

      </table>
    </div>
  </div>

  <!-- Create Event Modal -->
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
            <input type="text" v-model="title" class="form-control" placeholder="Enter title" />

            <label for="description" class="mt-2">Description</label>
            <input type="text" v-model="description" class="form-control" placeholder="Enter description" />

            <label for="document" class="mt-2">Event Date</label>
            <input type="date" v-model="event_date" class="form-control" />

            <label for="document" class="mt-2">Capacity</label>
            <input type="number" v-model="capacity" class="form-control" />

            <div class="d-flex justify-content-around mt-3">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
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
/* Sidebar styling */
.sidebar-links {
  background: #f8f7fd;
  height: 100vh;
}

.sidebar-links li {
  padding: 1rem;
}

.sidebar-links li:hover {
  background: #f6f3f3;
  text-transform: uppercase;
}

.sidebar {
  width: 20%;
  transition: left 0.3s ease-in-out;
}

/* Content styling */
.contents {
  width: 80%;
  height: 100vh;
}
.open{
  position: fixed;
  display: none;

}
/* Responsive sidebar */
@media screen and (max-width: 700px) {
  .open{
    display: block;
    right: 0;
    z-index: 1;
  }
  .sidebar {
    position: fixed;
    width: 100%;
    height: 80vh;
    background: #f8f7fd;
    left: -100%; /* Hide sidebar initially */
  }

  .sidebar-open {
    left: 0 !important; /* Show sidebar when open */
  }

  .contents {
    width: 100%;
    height: 50vh;
  }
}
</style>
