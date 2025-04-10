<script setup>


import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const {authUser, authHeader,base_url,storage} = auth()
const venues = ref([])
const bookings = ref([])
const venue = ref('')
const edit = ref(false)
const venue_location = ref('')
const capacity = ref('')
const description = ref('')
const amenities = ref('')
const price_per_hour = ref('')
const contact_email = ref('')
const contact_phone = ref('')
const picture = ref('')
const edit_id = ref('')
const venues_data = ref([])


// Sidebar state
const isSidebarOpen = ref(false);

function pictureUpload(e){
  picture.value=e.target.files[0];
}

const  CreateVenue = async () =>{
  const formData = new FormData()
  formData.append('venue',venue.value)
  formData.append('location',venue_location.value)
  formData.append('capacity',capacity.value)
  formData.append('description',description.value)
  formData.append('amenities',amenities.value)
  formData.append('price_per_hour',price_per_hour.value)
  formData.append('contact_email',contact_email.value)
  formData.append('contact_phone',contact_phone.value)
  formData.append('picture',picture.value)
  if(edit.value ===true){
    // alert('editing')
    const res = await axios.post(base_url.value + 'admin/venue/'+edit_id.value, formData, authHeader)
    if (res.data.status==='success') {
      // console.log(res)
      await getVenues()
      const modalElement = document.getElementById('venue'); // Ensure the ID matches your modal's HTML ID
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide(); // Close the modal programmatically
      await Swal.fire(
          'Success!',
          'venue Updated successfully',
          'success'
      );
    } else {
      await Swal.fire(
          'Failed!',
          'Something went wrong. Try again later.',
          'error' // Changed to 'error' for better context
      );

    }
  }
  else {
    // alert('creatting')
    const res = await axios.post(base_url.value + 'admin/venue', formData, authHeader)
    if (res.data.status === 'success') {
      alert('')
      // console.log(res)

      const modalElement = document.getElementById('venue'); // Your modal's ID
      const modal = new bootstrap.Modal(modalElement);
      modal.hide() // Close modal
      await getVenues()
      await Swal.fire(
          'Success!',
          'venue created successfully',
          'success'
      );
    } else {
      await Swal.fire(
          'Failed!',
          'Something went wrong. Try again later.',
          'error' // Changed to 'error' for better context
      );

    }
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
const populateVenue = (data) => {
  venues_data.value = data;
};
const EditVenue = (data) => {
     venue.value=data.venue
     venue_location.value=data.location
     capacity.value=data.capacity
     description.value=data.description
     amenities.value=data.amenities
     price_per_hour.value=data.price_per_hour
     contact_email.value=data.contact_email
     contact_phone.value=data.contact_phone
     picture.value=data.picture
      edit.value = true
      edit_id.value = data.id
};
function DisableEdit(){
  venue.value=''
  venue_location.value=''
  capacity.value=''
  description.value=''
  amenities.value=''
  price_per_hour.value=''
  contact_email.value=''
  contact_phone.value=''
  picture.value=''
  edit_id.value = ''
  edit.value = false
}
onMounted(()=>{
  getVenues()
})
</script>

<template>
  <Navbar />

  <!-- Sidebar Toggle Button -->
  <i
      :class="['bi', isSidebarOpen ? 'bi-x-lg' : 'bi-list-nested', 'open']"
      style="font-size: 30px; cursor: pointer; width: 100vw;"
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
              <button class="btn btn-primary me-4" data-bs-toggle="modal" @click="DisableEdit" data-bs-target="#venue">Create</button>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>

        <tr>

          <td class="border">Picture</td>
          <td class="border">venue</td>
          <td class="border">location </td>
          <td class="border">capacity</td>
          <td class="border">Action</td>
        </tr>
        <!-- Table Rows (Generated dynamically using Vue.js) -->
        <tr v-for="ven in venues" :key="ven" class="text-center align-middle">
          <td class="border">
            <img :src="storage+ven.picture" alt="No picture" height="200" width="200" id="profile-img">

          </td>
          <td class="border">{{ ven }} </td>
          <td class="border">{{ ven.venue }} </td>
          <td class="border">{{ ven.location }}</td>
          <td class="border">{{ ven.capacity }}</td>

          <td class="border"><button class="btn bg-secondary " @click="EditVenue(ven)" data-bs-toggle="modal" data-bs-target="#venue">Edit</button></td>
          <td class="border"><button class="btn bg-primary " @click="populateVenue(ven)" data-bs-toggle="modal" data-bs-target="#exampleModal">View more</button></td>
        </tr>
        </tbody>

      </table>
    </div>
  </div>

  <!-- Create Event Modal -->

  <div class="modal fade" id="venue" tabindex="-1" aria-labelledby="venueLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="venueLabel">
            {{ edit ? 'Edit Venue' : 'Create Venue' }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="CreateVenue">
            <label for="title">Venue Name</label>
            <input type="text" v-model="venue" class="form-control" placeholder="Enter venue">

            <label for="description" class="mt-2">location</label>
            <input type="text" v-model="venue_location" class="form-control" placeholder="Enter location">

            <label for="description" class="mt-2">Description</label>
            <input type="text" v-model="description" class="form-control" placeholder="Enter description">

            <label for="document" class="mt-2">amenities</label>
            <input type="text"  v-model="amenities" class="form-control">

            <label for="document" class="mt-2">Capacity</label>
            <input type="number"  v-model="capacity" class="form-control">

            <label for="document" class="mt-2">price_per_hour</label>
            <input type="number"  v-model="price_per_hour" class="form-control">

            <label for="document" class="mt-2">contact_email</label>
            <input type="email"  v-model="contact_email" class="form-control">

            <label for="document" class="mt-2">Contact_Phone</label>
            <input type="number"  v-model="contact_phone" class="form-control">

            <label for="document" class="mt-2">Picture Of Venue</label>
            <input type="file" @change="pictureUpload" />
            <div v-if="edit" class="">
              <img :src="storage+picture" alt="No picture" height="200" width="200" id="profile-img">

            </div>
            <div class="d-flex justify-content-around mt-3">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Venue details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h2 class="text-center">Venue Details</h2>
<!--          {{venues_data}}-->
          <div class="border p-2">
            <h2>Venue Name</h2>
            <p>{{venues_data.venue}}</p>
          </div>
          <div class="border p-2">
            <h2>Location</h2>
            <p>{{venues_data.location}}</p>
          </div>
          <div class="border p-2">
            <h2>Amenities</h2>
            <p>{{venues_data.amenities}}</p>
          </div>
          <div class="border p-2">
            <h2>Price per hour</h2>
            <p>{{venues_data.price_per_hour}}</p>
          </div>
          <div class="border p-2">
            <h2>Contact Email</h2>
            <p>{{venues_data.contact_email}}</p>
          </div>
          <div class="border p-2">
            <h2>Contact Phone</h2>
            <p>{{venues_data.contact_phone}}</p>
          </div>
          <div class="border p-2">
            <h2>Venue Profile</h2>
            <img :src="storage+venues_data.picture" alt="No picture" height="200" width="200" id="profile-img">
          </div>
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
    width: 100vw;
    height: 80vh;
    background: #f8f7fd;
    left: -100%; /* Hide sidebar initially */
  }

  .sidebar-open {
    left: 0 !important; /* Show sidebar when open */
  }

  .contents {
    width: 100vw;
    height: 50vh;
  }
}
</style>
