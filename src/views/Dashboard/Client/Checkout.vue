<script setup>


import axios from "axios";
import {auth} from "@/composables/auth.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Swal from "sweetalert2";
const {authUser, authHeader,base_url,storage} = auth()
const event_id = ref('')
const book = ref([])
const route = useRoute();
event_id.value = route.params.id


const  getBooking= async () => {
  const res = await axios.get(base_url.value + 'book/'+event_id.value, authHeader)
  if(res){
    book.value = res.data.booking
  }
}
const CheckOut = async (data) =>{
  data.total_price = 500
  const res = await axios.post(base_url.value + 'checkout/' + data.id, data, authHeader);

  if (res.data.status ==='success') {
    // Event deleted successfully, show success alert

    await Swal.fire('success!', 'Booking Updated successfully.', 'success');


  }
}
onMounted(()=>{
  getBooking()
})
</script>

<template>
  <Navbar />

  <!--  {{book}}-->
  <div class="d-flex flex-column align-items-center">

    <div class="card text-center w-50">
      <div class="card-header bg-danger text-white text-uppercase">
        Complete Checkout
      </div>

      <div class="card-body">
        <p class="text-center ">Confirm details before checking out</p>

          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Venue</h5>
            <p class="text-start">{{ book.venue }}</p>
          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Event date</h5>
            <input type="date" v-model="book.date">*
          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Price Per Hour</h5>
            <p class="text-start">{{ book.price_per_hour }}</p>
          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Start Time</h5>
            <p class="text-start">{{ book.start_time }}</p>

          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">End Time</h5>
            <p class="text-start">{{ book.end_time }}</p>
          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Total Price</h5>
            <p class="text-start">{{ book.total_price }}</p>
          </div>
          <button type="button"  @click="CheckOut(book)" class="btn btn-success">Checkout</button>


      </div>

    </div>
  </div>
</template>

<style scoped>

</style>