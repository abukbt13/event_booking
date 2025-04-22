<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { auth } from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";

const router = useRouter();
const { authUser, AuthenticatedUser, currentUser, authHeader, base_url } = auth()

const usersCount = ref(0)
const bookingsCount = ref(0)
const reviewsCount = ref(0)
const isSidebarOpen = ref(false)

const fetchReports = async () => {
  try {
    const res = await axios.get(base_url.value + "reports", authHeader)
    usersCount.value = res.data.users
    bookingsCount.value = res.data.active_bookings
    reviewsCount.value = res.data.reviews
  } catch (error) {
    console.error("Failed to fetch reports:", error)
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  AuthenticatedUser()
  if (currentUser.value?.role !== "admin") {
    router.push("/auth/login")
  }

  authUser()
  fetchReports()
})
</script>

<template>
  <Navbar />

  <!-- Sidebar Toggle -->
  <i
      :class="['bi', isSidebarOpen ? 'bi-x-lg' : 'bi-list-nested', 'open']"
      style="font-size: 30px; cursor: pointer; width: 100vw;"
      @click="toggleSidebar"
  ></i>

  <div class="d-flex">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <ul class="sidebar-links list-unstyled">
        <router-link class="text-decoration-none" to="/admin/dashboard"><li>Home</li></router-link>
        <router-link class="text-decoration-none" to="/admin/events"><li>Venues</li></router-link>
        <router-link class="text-decoration-none" to="/admin/bookings"><li>Bookings</li></router-link>
      </ul>
    </div>

    <!-- Content -->
    <div class="contents p-4">
      <h2 class="text-center mb-4">Admin Reports Dashboard</h2>

      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card p-3 shadow-sm rounded">
            <h4>Total Users</h4>
            <p class="fs-3 fw-bold text-primary">{{ usersCount }}</p>
            <router-link class="btn btn-outline-primary mt-2" to="/admin/users">View Users</router-link>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card p-3 shadow-sm rounded">
            <h4>Active Bookings</h4>
            <p class="fs-3 fw-bold text-success">{{ bookingsCount }}</p>
            <router-link class="btn btn-outline-success mt-2"  to="/admin/bookings">View Bookings</router-link>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card p-3 shadow-sm rounded">
            <h4>Total Reviews</h4>
            <p class="fs-3 fw-bold text-warning">{{ reviewsCount }}</p>
            <router-link class="btn btn-outline-warning mt-2" to="/admin/reviews">View Reviews</router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
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

.contents {
  width: 80%;
  height: 100vh;
}

.open {
  position: fixed;
  display: none;
}

@media screen and (max-width: 700px) {
  .open {
    display: block;
    right: 0;
    z-index: 1;
  }

  .sidebar {
    position: fixed;
    width: 100vw;
    height: 80vh;
    background: #f8f7fd;
    left: -100%;
  }

  .sidebar-open {
    left: 0 !important;
  }

  .contents {
    width: 100vw;
    height: auto;
  }
}
</style>
