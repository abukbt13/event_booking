<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
const {authUser, authHeader,base_url,storage} = auth()
const events =ref([])

const  getevents= async () => {
  const res = await axios.get(base_url.value + 'event', authHeader)
  if(res){
    events.value = res.data.events
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
        <router-link to="/venues">Book Venue</router-link>
      </td>
    </tr>

  </table>

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