<script setup>

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />

  <div class="main-content">


    <h2 class="text-center">Eventsphere</h2>

    <div class="m-4 content d-flex flex-column flex-sm-column flex-md-row flex-lg-row justify-content-evenly">
      <div class="about-us">
        <h2 class="text-dark">About Us</h2>
        <p>
          Eventsphere is your trusted partner in event creation and management.
          We specialize in simplifying the process of planning and
          organizing events by offering affordable venue booking services.
          Whether it’s a wedding, corporate gathering, or private party,
          we connect you with ideal venues tailored to your needs,
          helping you create unforgettable experiences with ease.
          At Eventsphere, we turn your vision into reality by providing expert
          guidance and support every step of the way.

        </p>
        <div class="col ">
          <h3>Motto</h3>
          <p>Your Event, Our Passion.</p>

          <h4>Mission:</h4>
          <p>
            To revolutionize event planning by providing seamless, affordable,
            and reliable venue booking and event management services, ensuring our clients have stress-free and memorable experiences.
          </p>
          <h4> Vision:</h4>
          <p>
            To become the leading platform for accessible and innovative event solutions,
            empowering individuals and organizations to create remarkable moments that inspire
            and connect people globally.
          </p>
        </div>


      </div>

      <div class="contact-us">
        <h2 class="">Contact Us  </h2>
        <p><i style="color: blue; font-size: 27px" class="bi mx-4 bi-telephone"></i> 0794....</p>
        <p><i style="color: blue; font-size: 27px" class="bi  mx-4 bi-messenger"></i>Eventspheresavings@gmail.com</p>

        <p>You can contact us by sending us a message or emailing us using the details we have provided you with</p>

      </div>
    </div>
  </div>


</template>

<style scoped>
.main-content{
  box-shadow: #41464b;
}
.contact-us,.about-us{
  max-width: 47%;
}
@media screen and (min-width:200px) and (max-width:700px) {
  .contact-us,.about-us{
    max-width: 100%;
  }
}
</style>