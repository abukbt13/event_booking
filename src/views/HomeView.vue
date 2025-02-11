<script setup>

import Navbar from "@/components/Navbar.vue";
</script>

<template>
 <Navbar />
    <div class="main-body">
      <h1 class="text-center">Eventsphere</h1>
      <h3 class="my-2 p-x-2 text-center ">Quick and convenient place for you <br> to create and do your boookings </h3>

      <router-link to="/about_us" style="background:orange;" class="my-2 text-decoration-none text-white p-2 text-uppercase">Get In Tough</router-link>
    </div>
</template>

<style >

.body{
  background-color: #f6f3f3;
}
.main-body
{
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/eagle.png");
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

</style>