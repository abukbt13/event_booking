<script setup>
import axios from "axios";
import { auth } from "@/composables/auth.js";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Swal from "sweetalert2";

const { authUser, authHeader, base_url, storage } = auth();
const book_id = ref("");
const book = ref({
  start_time: "",
  end_time: "",
  price_per_hour: 0,
  total_price: 0,
});
const route = useRoute();
book_id.value = route.params.id;

const getBooking = async () => {
  const res = await axios.get(base_url.value + "book/" + book_id.value, authHeader);
  if (res) {
    book.value = res.data.booking;
  }
};

const CheckOut = async (data) => {
  // alert(data.id)
  const res = await axios.post(base_url.value + "checkout/" + data.id, data, authHeader);

  if (res.data.status === "success") {
    await Swal.fire("Success!", "Payment made successfully successfully.", "success");
  }
};

const computeTotalPrice = () => {
  if (!book.value.start_time || !book.value.end_time) return;

  const [startH, startM] = book.value.start_time.split(":").map(Number);
  const [endH, endM] = book.value.end_time.split(":").map(Number);

  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  const diffMinutes = end - start;

  if (diffMinutes > 0) {
    const hours = diffMinutes / 60;
    book.value.total_price = (hours * book.value.price_per_hour).toFixed(2);
  } else {
    book.value.total_price = 0;
  }
};

// Watchers to compute total time when start or end time changes
watch(
    () => [book.value.start_time, book.value.end_time],
    computeTotalPrice
);

onMounted(() => {
  getBooking();
});
</script>

<template>
  <Navbar />

<!--    {{book_id}}-->
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
            <input
                id="start_time"
                type="time"
                v-model="book.start_time"
                class="form-control"
                required
            />

          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">End Time</h5>
            <input
                id="start_time"
                type="time"
                v-model="book.end_time"
                class="form-control"
                required
            />
          </div>
          <div class="border p-2 m-2">
            <h5 class="text-start text-uppercase">Total Price</h5>
            <p class="text-start">{{ book.total_price }}</p>
          </div>
<!--        {{book}}-->
          <button type="button"  @click="CheckOut(book)" class="btn btn-success">Checkout</button>


      </div>

    </div>
  </div>
</template>

<style scoped>

</style>