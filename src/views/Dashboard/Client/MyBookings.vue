<script setup>
  import axios from "axios";
  import {onMounted, ref} from "vue";
  import {auth} from "@/composables/auth.js";
  import Navbar from "@/components/Navbar.vue";
  import Swal from "sweetalert2";
  const {authUser, authHeader,base_url,storage} = auth()
  const bookings =ref([])
  const event_data =ref([])
  const booking_data =ref([])

  const  getbookings= async () => {
  const res = await axios.get(base_url.value + 'book', authHeader)
  if(res){
  bookings.value = res.data.bookings
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



  if (result.isConfirmed) {

  // Close the modal before making the delete request

  const res = await axios.get(base_url.value + 'event/delete/' + id, authHeader);

  if (res.data.status ==='success') {
  // Event deleted successfully, show success alert

  await Swal.fire('Deleted!', 'The event has been deleted.', 'success');


}
  await getbookings()
}
  else {
  // Close the modal if the user cancels the delete action

  await Swal.fire('Cancelled', 'The event was not deleted.', 'info');
}
}
  const UpdateEvent = async (data) =>{
  const res = await axios.post(base_url.value + 'event/update/' + data.id, data, authHeader);

  if (res.data.status ==='success') {
  // Event deleted successfully, show success alert

  await Swal.fire('success!', 'The event has been Updated.', 'success');


}
}
  const populateBookings = (data) => {
    booking_data.value = data
  }

  onMounted(()=>{

    authUser()
    getbookings()
})
</script>

<template>
  <Navbar />
<!--    {{bookings}}-->
  <div class="m-4">
    <table  class="table  border table-hover table-bordered">
      <!-- Table Header -->
   <thead>
   <tr>
     <th colspan="6" class="text-uppercase">
       <div class="d-flex justify-content-between"><div class="">bookings</div>
         <!--          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#venue">Create</button>-->
       </div>
     </th>
   </tr>
   </thead>
      <tbody>

      <tr>
        <th class="border">Venue</th>
        <th class="border">Event Date </th>
        <th class="border">Start Time </th>
        <th class="border">End Time </th>
      </tr>
      <!-- Table Rows (Generated dynamically using Vue.js) -->
      <tr v-for="booking in bookings" :key="booking">
        <td class="border">{{ booking.venue }} </td>
        <td class="border">{{ booking.date }} </td>
        <td class="border">{{ booking.start_time }}</td>
        <td class="border">{{ booking.end_time }}</td>
        <td class="border">
          <button @click="populateBookings(booking)"   class="btn bg-secondary  btn-sm" data-bs-toggle="modal" data-bs-target="#event_view">View</button>
        </td>
      </tr>

      </tbody>
    </table>

  </div>

  <!--  modal to view-->
  <div class="modal fade modal-dialog-scrollable" id="event_view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
<!--          {{booking_data}}-->
          <h1 class="modal-title fs-5" id="exampleModalLabel">Bookings Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-4">

          <h1>Title</h1>
          <input type="text" class="form-control" v-model="booking_data.title">

          <h2>Desription</h2>
          <textarea  class="form-control" cols="3" rows="3" v-model="booking_data.description"></textarea>

          <h3>Venue</h3>
          <div class="border p-2">{{booking_data.venue}}</div>

          <h3>Capacity</h3>
          <div class="border p-2">{{booking_data.capacity}} People</div>

          <h3>Price Per Hour</h3>
          <div class="border p-2">Ksh . {{booking_data.price_per_hour}}</div>

          <h3>Total Price</h3>
          <div class="border p-2">Ksh . {{booking_data.total_price}}</div>

          <h4>Event Date</h4>
          <div class="border p-2">Ksh . {{booking_data.event_date}}</div>

          <h4>Start Time</h4>
          <div class="border p-2">Ksh . {{booking_data.start_time}}</div>

          <h4>End Time</h4>
          <div class="border p-2">Ksh . {{booking_data.end_time}}</div>
          <h4>Status</h4>
          <div class="border bg-danger p-2 text-center text-uppercase">{{booking_data.status}}</div>

        </div>
      </div>
    </div>
  </div>

  <!--  modal-->

</template>

<style scoped>

</style>


<style scoped>

</style>