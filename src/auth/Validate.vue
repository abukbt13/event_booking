
<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const id = ref('')

id.value=route.id
</script>

<template>
  {{id}}
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at consequatur consequuntur cum dicta, ex fuga id iusto, labore nam praesentium quia quidem ratione tenetur ut, veritatis voluptates voluptatibus. Eius, illum, nesciunt?</p>
</template>


<style scoped>

</style>