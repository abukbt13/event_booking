<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: #f8f6f6; max-width: 100%;min-width: 100%;" class="row py-4 footer px-4 d-flex justify-content-center">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h5 class="text-uppercase text-primary">Eventsphere</h5>
      <p style="color: black;" class="">
        Evensphere your ultime event and booking partner</p>

    </div>
    <div class="col col-12 col-sm-3 mt-2 mx-2">
      <h5  class="text-uppercase text-primary">Quick Links</h5>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Login</router-link>
      </li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/user/profile">Profile</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/user/dashboard">Dashboard</router-link></li>
    </div>

    <div class="col col-12  col col-sm-3 mt-2">
      <h5 class="text-uppercase text-primary">Services</h5>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/client/dashboard">Create Event</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/client/event">Venues</router-link></li>

    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h5 class="">Contact through the following numbers</h5>
      <p>
        <i style="font-size: 30px; padding: 1rem;" class="bi bi-telephone-fill"></i>
        <span>0794495518</span>
      </p>
      <p>
        <i style="font-size: 30px; padding: 1rem;"  class="bi bi-envelope-open-fill"></i>

        <span>jakos2000@gmail.com</span>
      </p>
      <li class="list-unstyled fs-4"><router-link class="btn btn-primary text-decoration-none link" to="/about_us">About Us</router-link></li>

    </div>
  </div>
</template>

<style scoped>


.link{
  padding-right:5rem;
  color:black;
  text-transform: uppercase;
}
.link:hover{
  background-color: lightskyblue;
}
</style>