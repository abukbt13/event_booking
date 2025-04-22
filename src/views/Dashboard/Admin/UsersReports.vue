<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { auth } from '@/composables/auth.js'
import Navbar from '@/components/Navbar.vue'

const { base_url, authHeader } = auth()
const users = ref([])

const fetchUsers = async () => {
  try {
    const res = await axios.get(`${base_url.value}admin/users`, authHeader)
    users.value = res.data.users
  } catch (error) {
    console.error("Failed to fetch users:", error)
  }
}
const printReport = () => {
  window.print()
}


onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <Navbar />
  <div class="container">
    <h2 class="text-center mb-4">
      Users Report
      <div class="btn p-1 btn-info ms-2 d-inline-block" @click="printReport">Print</div>
    </h2>
    <div v-if="users.length === 0" class="text-center text-muted">No users found.</div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Joined At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ new Date(user.created_at).toLocaleDateString() }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
</style>
