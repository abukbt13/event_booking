<script setup>

import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/composables/auth.js";
const {authUser, authHeader,base_url,storage} = auth()
const document = ref('')
const documents = ref([])
const title = ref('')
const description = ref('')
function  uploadDocument(e){
  document.value = e.target.files[0]
}
const  saveImage = async () =>{
  if(document.value === ''){
    alert("Please select a document")
    return
  }
  const formData = new FormData()
  formData.append('document',document.value)
  formData.append('title',title.value)
  formData.append('description',description.value)
  const res = await axios.post(base_url.value + 'admin/document', formData, authHeader)
  if (res.data.status==='success') {
    // const modalElement = document.getElementById('exampleModal');
    // const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    // modal.hide();  // Close modal
    await Swal.fire(
        'Success!',
        'Document saved successfully',
        'success'
    );
    getDocuments()
  } else {
    Swal.fire(
        'Failed!',
        'Something went wrong. Try again later.',
        'error' // Changed to 'error' for better context
    );

  }

}
</script>

<template>

</template>

<style scoped>

</style>