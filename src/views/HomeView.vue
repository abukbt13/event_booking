<script setup>

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
 <Navbar />
    <div class="main-body">
      <h1 class="text-center">Eventsphere</h1>
      <h3 class="my-2 p-x-2 text-center ">Quick and convenient place for you <br> to create and do your boookings </h3>

      <router-link to="/about_us"  class="my-2 btn bg-primary text-decoration-none text-white p-2 text-uppercase">Get In Tough</router-link>
    </div>
  <div class="">
    <h2 class="text-center text-uppercase">
      Our Services
    </h2>
    <div class="services three-columns mt-4 m-4">
      <p><i class="bi bi-chevron-right"></i> Birthday</p>
      <p><i class="bi bi-chevron-right"></i> Graduation</p>
      <p><i class="bi bi-chevron-right"></i> Fundraising</p>
      <p><i class="bi bi-chevron-right"></i> Cultural</p>
      <p><i class="bi bi-chevron-right"></i> Political</p>
      <p><i class="bi bi-chevron-right"></i> Team Building</p>
    </div>
  </div>

  <Footer />
</template>

<style >


.main-body
{
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/event11.jpg");
  background-size: cover;
  background-position: center;
  color:blue;
}
.clients{
  justify-content: center;
  width: 100%;
}
.client{
  border: 1px solid #ddd;
}
.services {
  column-gap: 2rem;
}


.three-columns {
  column-count: 3;
}


</style>