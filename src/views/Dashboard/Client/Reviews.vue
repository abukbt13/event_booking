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
  const res = await axios.get(base_url.value + 'my/reviews', authHeader);
  if (res) {
    reviews.value = res.data.reviews;
  }
};

const setRating = (value) => {
  rating.value = value;
};

const submitReview = async () => {
  if (rating.value === 0 || comment.value.trim() === '') {
    errorMessage.value = 'Please provide a rating and a comment.';
    return;
  }

  const formData = new FormData();
  formData.append("rating", rating.value);
  formData.append("comment", comment.value);

  const res = await axios.post(base_url.value + "reviews", formData, authHeader);

  if (res.data.status === "success") {
    comment.value = "";
    rating.value = "";
    successMessage.value = 'Thank you! Your review has been submitted.';
    rate.value = false;
    await geteReviews();
  } else {
    errorMessage.value = res.data.message;
    await Swal.fire("Failed!", "Something went wrong. Try again later.", "error");
  }
};

onMounted(() => {
  geteReviews();
});
</script>

<template>
  <Navbar />

  <h2 v-if="errorMessage" class="text-center bg-danger text-white p-2 text-uppercase">
    {{ errorMessage }}
  </h2>
  <h2 v-if="successMessage" class="text-center bg-info text-white p-2 text-uppercase">
    {{ successMessage }}
  </h2>
  <div v-if="rate" class="content p-4 mt-4 rounded shadow">
    <h2 class="text-center mb-4">Leave a Review</h2>

    <form @submit.prevent="submitReview">
      <!-- Star Rating -->
      <div class="mb-3 text-center">
        <h5 class="form-label d-block">Rating</h5>
        <span v-for="i in 5" :key="i" @click="setRating(i)" style="cursor: pointer">
            <i
                class="bi"
                :class="i <= rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'"
            ></i>
          </span>
      </div>

      <!-- Comment -->
      <div class="mb-3">
        <label for="comment" class="form-label">Comment</label>
        <textarea
            v-model="comment"
            id="comment"
            rows="4"
            class="form-control"
            placeholder="Write your feedback here..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-send"></i> Submit Review
        </button>
      </div>
    </form>
  </div>

  <div class="container mt-3">
    <h2 class="text-center">
      My Reviews
      <span
          @click="rate = !rate"
          class="border bg-info px-2 cursor-pointer text-white rounded ms-2"
      >
        {{ rate ? 'Cancel' : 'Add review' }}
      </span>
    </h2>

    <p v-for="review in reviews" :key="review.id" class="border p-2 mb-4">
      {{ review.comment }}
    </p>

    <!-- Review Form -->
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
.content {
  background: #f7f7f7;
}
.bi-star,
.bi-star-fill {
  font-size: 1.5rem;
  margin-right: 3px;
}
</style>
