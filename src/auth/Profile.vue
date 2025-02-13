<script setup>

import {onMounted,ref} from "vue";
import {auth} from "@/composables/auth.js";
import axios from "axios";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar.vue";

const {AuthenticatedUser, currentUser,authHeader,base_url,storage} = auth()
const router = useRouter()
const email = ref('')
const my_location = ref('')
const my_phone = ref('')
const occupation = ref('')
const profilePicture =ref('')
const status =ref('')

function LogOut(){
  localStorage.removeItem('token')
  router.push('/auth/login/');
}
function  uploadImage(e){
  profilePicture.value = e.target.files[0]
}
const  saveImage = async () =>{
  if(profilePicture.value === ''){
    alert("Please select an image")
    return
  }
  const formData = new FormData()
  formData.append('profile',profilePicture.value)
  const res = await axios.post(base_url.value + 'me/profile', formData, authHeader)
  console.log(res.data)
  if (res.data.status==='success') {
    // const modalElement = document.getElementById('exampleModal');
    // const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    // modal.hide();  // Close modal
    await AuthenticatedUser()
    await Swal.fire(
        'Success!',
        'Profile recorded successfully',
        'success'
    );

  } else {
    Swal.fire(
        'Failed!',
        'Something went wrong. Try again later.',
        'error' // Changed to 'error' for better context
    );

  }
}

const saveRecords =async () => {
  const formData = new FormData();
  formData.append('my_phone', my_phone.value)
  formData.append('my_location', my_location.value)
  formData.append('occupation', occupation.value)

  const res = await axios.post(base_url.value + 'me/setting', formData, authHeader)
  //
  if (res.data.status === 'success') {
    getDetails()
    status.value = res.data.message
  }
}


onMounted(()=>{
  AuthenticatedUser()
})
</script>

<template>

<Navbar />

  <table class="table table-bordered">
    <thead>
    <tr>
      <td colspan="2" class="td">
        <div  class="d-flex justify-content-between align-items-center">
          <h2>Personal Details</h2>
          <span @click="LogOut"  class="float-end text-uppercase  p-2 text-white bg-danger">logout</span>
        </div>
      </td>
    </tr>
    </thead>
    <tbody>

    <tr>
      <td>Full names</td>
      <td>{{  currentUser.first_name }} {{  currentUser.last_name }} </td>
    </tr>
    <tr>
      <td>Email</td>
      <td>{{  currentUser.email }}</td>
    </tr>
    <tr>
      <td>Phone number</td>
      <td>{{  currentUser.phone }}</td>
    </tr>
    <tr>
      <td>Profile Picture</td>
      <td>

        <img :src="storage+'Profiles/'+currentUser.profile" alt="Upload picture" height="200" width="200" id="profile-img">

      </td>
    </tr>
    <tr class="p-2 m-2 text-center">
      <td colspan="2" class="">
        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn mx-4  bg-success text-white">
          Update profile
        </button>
      </td>
    </tr>
    <tr>
      <td>Referees</td>
      <td>
        <p>Referees are the closest friends we can contact in case emergencies or while you are not found</p>
        <p>Click the button below to view and add your referees</p>
        <router-link to="/user/referees" class="block border fs-2 text-decoration-none">Referees</router-link>
      </td>
    </tr>
    </tbody>
  </table>

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