<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
import Navbar from "@/components/Navbar.vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import Swal from "sweetalert2";
const {authUser, authHeader,base_url,storage} = auth()
const venues =ref([])
const start_time =ref('')
const end_time =ref('')
const event_date =ref('')
const capacity =ref('')
const venues_data =ref({})
const event_id = ref('')
const route = useRoute();
event_id.value = route.params.id
const  getVenues= async () => {
  const res = await axios.get(base_url.value + 'show/venues', authHeader)
  if(res){
    venues.value = res.data.venues
  }
}
const populateVenues = (data) => {
  venues_data.value = data
}

onMounted(()=>{
  getVenues()
  authUser()
})
</script>

<template>
  <Navbar />
  <h2 class="text-center">Available venues</h2>
<!--  {{venues}}-->
  <div class="home" >
    <div class="events">
      <div
          class="border m-3 p-2"
          v-for="venue in venues"
          :key="venue.id"
          :style="{ backgroundImage: `url(${storage + venue.picture})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }"
      >
        <h3 class="text-center"><span class="bg-light">{{venue.venue}}</span></h3>
        <p class="text-center location"><span class="bg-light">Location :{{venue.location}}</span></p>
        <div class="text-center" ><button @click="populateVenues(venue)" data-bs-toggle="modal" data-bs-target="#venue_view" class="btn bt-sm btn-primary">More details</button></div>
      </div>
    </div>

  </div>
  <div class="modal fade" id="venue_view" tabindex="-1" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Venue Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="p-4">
<!--                    ddd{{venues_data}}-->
           <h3>Venue</h3>
            <p class="p-1 text-info">
              {{ venues_data.venue }}
            </p>

          <h2></h2>
            <h3>Description</h3>
            <p class="p-1 text-info">
              {{ venues_data.description }}
            </p>

            <h3>Maximum number of people it can hold</h3>
              <p class="p-1 text-info">
                {{ venues_data.capacity }} People
              </p>

            <h3>Amenities</h3>
            <p class="p-1 text-info">
              {{ venues_data.amenities }}
            </p>
            <h3>Price per hour</h3>
          <p class=" p-1 text-info">
            Ksh. {{ venues_data.price_per_hour }}
          </p>

          <h3>Contact Email</h3>
          <p>
            {{ venues_data.contact_email }}
          </p>
          <h3>Contact Phone</h3>
          <p>
            {{ venues_data.contact_phone }}
          </p>



          <div class="d-flex justify-content-around mt-2">
            <a
                v-if="event_id"
                :href="'/booking/' + event_id +'/' +venues_data.id"
                style="background: red;"
                class="btn float-end"
            >
              Proceed to Book
            </a>
            <a
                href="/client/events"
                v-else
                class="btn btn-danger float-end"

            >
              Select Event
            </a>
          </div>


        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.home{
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}
.events{

  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (min-width: 400px) and (max-height: 600px) {
  .events{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>