<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import Swal from "sweetalert2";
const {authUser, authHeader,base_url,storage} = auth()
const events =ref([])
const event_data =ref([])

const  getevents= async () => {
  const res = await axios.get(base_url.value + 'event', authHeader)
  if(res){
    events.value = res.data.events
  }
}
const populateEvent = (data) => {
  event_data.value = data
}
const deleteEvent = async (id) => {
  // Show confirmation prompt
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this event?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  // Get the modal element and initialize Bootstrap Modal
  const modalElement = document.getElementById('view'); // Your modal's ID
  const modal = new bootstrap.Modal(modalElement);

  if (result.isConfirmed) {
    try {
      // Close the modal before making the delete request
      modal.hide();

      const res = await axios.get(base_url.value + 'event/delete/' + id, authHeader);

      if (res) {
        // Event deleted successfully, show success alert
        Swal.fire('Deleted!', 'The event has been deleted.', 'success');
      }
    } catch (error) {
      // Handle error
      Swal.fire('Error!', 'There was an issue deleting the event.', 'error');
    }
  } else {
    // Close the modal if the user cancels the delete action
    modal.hide();
    Swal.fire('Cancelled', 'The event was not deleted.', 'info');
  }
}


onMounted(()=>{
  getevents()
})
</script>

<template>
  <Navbar />
<!--  {{events}}-->
  <div class="m-4">
      <table  class="table  border table-hover table-bordered">
    <!-- Table Header -->
    <tr>
      <th colspan="6" class="text-uppercase">
        <div class="d-flex justify-content-between"><div class="">events</div>
<!--          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#venue">Create</button>-->
        </div>
      </th>
    </tr>
    <tr>
      <th class="border">Title</th>
      <th class="border">Description </th>
      <th class="border">capacity</th>
    </tr>
    <!-- Table Rows (Generated dynamically using Vue.js) -->
    <tr v-for="event in events" :key="ven">
      <td class="border">{{ event.title }} </td>
      <td class="border">{{ event.description }}</td>
      <td class="border">{{ event.capacity }}</td>
      <td class="border">
        <router-link class="btn bg-primary btn-success" to="/user/venues">Book Venue</router-link>
      </td>
      <td class="border">
        <button @click="populateEvent(event)"   class="btn bg-secondary  btn-sm" data-bs-toggle="modal" data-bs-target="#view">View</button>
      </td>
    </tr>

  </table>

  </div>

<!--  modal to view-->
  <div class="modal fade" id="view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Events Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-4">
<!--          {{event_data}}-->
          <h1>Title</h1>
          <p class="border p-2">{{ event_data.title }}</p>
          <h2>Desription</h2>
          <p class="border p-2">{{ event_data.description }}</p>
          <h3>Capacity</h3>
          <p class="border p-2">{{ event_data.capacity }}</p>
          <h4>Event Date</h4>
          <p class="border p-2">{{ event_data.event_date }}</p>
          <div class="d-flex justify-content-around">
            <button class="btn bg-primary">Book Venue</button>
            <button class="btn bg-danger" @click="deleteEvent(event_data.id)">Delete Event</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  modal-->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"> settings</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveImage">
            <label for="">
              Profile picture
            </label>
            <input type="file" class="form-control" @change="uploadImage">
            <button data-bs-dismiss="modal" type="submit" class="btn bg-primary m-2">Update </button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>