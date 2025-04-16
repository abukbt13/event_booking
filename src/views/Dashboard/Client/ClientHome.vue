<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import { auth } from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import {Modal} from "bootstrap";
import * as bootstrapModal from "@popperjs/core";
import {useRouter} from "vue-router";
const { authUser,AuthenticatedUser, currentUser, authHeader, base_url } = auth();

// Form inputs
const router = useRouter()
const title = ref("");
const description = ref("");
const capacity = ref("");
const event_date = ref("");
const message = ref("");
const error = ref("");

// Sidebar state
const isSidebarOpen = ref(false);

const CreateEvent = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("capacity", capacity.value);
  formData.append("event_date", event_date.value);

  const res = await axios.post(base_url.value + "event", formData, authHeader);

  if (res.data.status === "success") {

    await Swal.fire("Success!", "Event created successfully", "success");

    // Reset form fields
    title.value = "";
    description.value = "";
    capacity.value = "";
    event_date.value = "";
    message.value=res.data.status

  } else {
    // message.value=res.data.status
    error.value=res.data.message

    await Swal.fire("Failed!", "Something went wrong. Try again later.", "error");
  }
}
// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
onMounted( ()=>{
  authUser()
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
        <router-link class="text-decoration-none" to="/client/events">
          <li>Events</li>
        </router-link>
        <router-link class="text-decoration-none" to="/client/bookings">
          <li>Bookings</li>
        </router-link>
      </ul>
    </div>

    <!-- Content -->
    <div class="contents">
      <h3 v-if="message" class="bg-danger text-center text-white text-uppercase">Event created successfully</h3>
      <h3 v-if="error" class="bg-danger p-2 text-center  text-white text-uppercase">{{error}} <button data-bs-toggle="modal" data-bs-target="#create_event" class="btn btn-sm btn-primary">Try again</button></h3>
      <div class="contents d-flex flex-column justify-content-around">
        <div class="d-flex flex-row justify-content-around">
          <div class="d-flex flex-column">
            <div class="border d-flex flex-column p-4">
              <h2>Events</h2>
              <router-link class="my-2" to="/client/events">My Events</router-link>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create_event">Create Event</button>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="border d-flex flex-column p-4">
              <h2>Bookings</h2>
              <router-link to="/client/bookings" class="my-2 btn btn-primary">My Bookings</router-link>
            </div>
          </div>
        </div>
      </div>

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
            <select v-model="title" class="form-control" required>
              <option value="" disabled>---Select Event Type---</option>
              <option value="Wedding">Wedding</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Cultural Event">Cultural Event</option>
              <option value="Political Rallies">Political Rallies</option>
              <option value="Team Building">Team Building</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Graduation ceremony">Graduation ceremony</option>
            </select>
<!--            <input type="text" v-model="title" class="form-control" placeholder="Enter title" />-->

            <label for="description" class="mt-2">Description</label>
            <textarea v-model="description" required class="form-control" rows="5">

            </textarea>

            <label for="document" class="mt-2">Event Date</label>
            <input type="date" v-model="event_date" required class="form-control" />

            <label for="document" class="mt-2">Capacity</label>
            <input type="number" v-model="capacity" required min="2" class="form-control" />

            <div class="d-flex justify-content-around mt-3">
              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
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
  height: 50vh;
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
    height: 100vh;
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
