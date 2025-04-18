<script setup>


import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useRouter} from "vue-router";

const {authUser,AuthenticatedUser, currentUser, authHeader,base_url,storage} = auth()
const venues = ref([])
const router = useRouter();
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
  AuthenticatedUser()
  if (currentUser.value?.role !== 'admin') {
    // alert('')
    router.push('/auth/login');
  }
  authUser()
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
        <router-link class="text-decoration-none" to="/admin/dashboard">  <li> Home</li></router-link>
        <router-link class="text-decoration-none" to="/admin/events">  <li> Venues</li></router-link>
        <router-link class="text-decoration-none" to="/admin/bookings">  <li> Bookings</li></router-link>
      </ul>
    </div>

    <!-- Content -->
    <div class="contents">
      <h2>Reports</h2>
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
