import AdminHome from "@/views/Dashboard/Admin/AdminHome.vue";
import ShowBookings from "@/views/Dashboard/Admin/ShowBookings.vue";

const routes =[
    {
        path: '/admin/dashboard',
        component: AdminHome,
    } ,
    {
        path: '/admin/bookings',
        component: ShowBookings,
    }
]
export default routes