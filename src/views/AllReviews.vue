<script setup>
import { onMounted, ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "@/composables/auth.js";

const { authHeader, base_url } = auth();

const rating = ref('');
const comment = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const rate = ref(false); // Start with form hidden
const reviews = ref([]);

const geteReviews = async () => {
  const res = await axios.get(base_url.value + 'reviews', authHeader);
  if (res) {
    reviews.value = res.data.reviews;
  }
};



onMounted(() => {
  geteReviews();
});
</script>

<template>
  <Navbar />

  <div class="container mt-3">
    <h2 class="text-center">
       Reviews
    </h2>

    <div class="reviews container mt-4">
          <div v-for="review in reviews" :key="review.id" class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-person-circle fs-4 text-primary"></i>
              <strong>{{ review.first_name }} {{ review.last_name }}</strong>
            </div>
            <!-- Optional rating -->
            <div v-if="review.rating">
          <span v-for="i in 5" :key="i">
            <i :class="i <= review.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'"></i>
          </span>
            </div>
          </div>
          <p class="mb-0">{{ review.comment }}</p>
        </div>
      </div>
    </div>

    <!-- Review Form -->
  </div>
</template>

<style scoped>

</style>
