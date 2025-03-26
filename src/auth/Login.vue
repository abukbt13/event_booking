<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { auth } from "@/composables/auth";
import Navbar from "@/components/Navbar.vue";

const router = useRouter();
const email = ref('');
const password = ref('');
const unique_id = ref(null);
const regerror = ref(null);
const logging = ref(true); // Spinner state

const { base_url, authHeader } = auth();

const login = async () => {
  regerror.value = null; // Reset error
  logging.value = false; // Show spinner

  if (email.value === '' || password.value === '') {
    regerror.value = 'Please fill all fields';
    logging.value = true; // Stop spinner
    return;
  }

  try {
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    const res = await axios.post(base_url.value + 'auth/login', formData);

    if (res.status === 200) {
      const userRole = res.data.user.role;

      // Handle user role redirection
      if (userRole === 'client') {
        localStorage.setItem('token', res.data.token);
        await router.push('/client/dashboard');
      } else if (userRole === 'admin') {
        localStorage.setItem('token', res.data.token);
        await router.push('/admin/dashboard');
      } else {
        regerror.value = 'Unauthorized role!';
      }
    } else {
      // Handle unexpected status codes
      regerror.value = 'Unexpected response from server.';
    }
  } catch (error) {
    // Handle network or API errors
    regerror.value = 'Network error. Please try again later.';
  } finally {
    logging.value = true; // Stop spinner in all cases
  }
};
</script>

<template>
  <section class="vh-75">
    <Navbar />
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-danger text-white text-uppercase" v-if="unique_id">{{ unique_id }}</div>
        <h2 class="text-center text-uppercase">Login Page</h2>
        <p>Don't have an account? <router-link to="/auth/register">Register</router-link></p>
        <div class="error text-center bg-danger text-white text-uppercase p-2" v-if="regerror">{{ regerror + '!' }}</div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
                id="email"
                type="email"
                class="form-control"
                v-model="email"
                placeholder="Enter your email here"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
                id="password"
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Password"
            />
          </div>
          <div>
            <!-- Show spinner or button -->
            <button
                type="submit"
                class="w-100 btn btn-primary btn-block"
                v-show="logging"
            >
              Login
            </button>
            <div v-if="!logging" class="text-center">
              <h3 class="d-flex justify-content-between align-items-center">
                Verifying...
                <div class="spinner-grow text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </h3>
            </div>
          </div>
          <br />
        </form>
        <p>
          Don't remember password?
          <router-link to="/auth/forget-password">Reset Now</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  font-weight: bold;
}
</style>
