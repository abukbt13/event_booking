<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: #f8f6f6; max-width: 100%;min-width: 100%;" class="row py-4 footer px-4 d-flex justify-content-center">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h5 class="text-uppercase text-primary">Eventsphere</h5>
      <p style="color: black;" class="">Eagles your financial loving partner in all your savings and investments </p>

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
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/">Cretae Event</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/">Venues</router-link></li>

    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h5  class="text-uppercase text-primary">More</h5>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/sponsors">Sponsors</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/business">Business</router-link></li>
      <h5 class="m-2 text-primary">Other</h5>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/faqs">FAQS</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/docs">Docs</router-link></li>

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