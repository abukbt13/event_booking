import AdminHome from "@/views/Dashboard/Admin/AdminHome.vue";
import ShowBookings from "@/views/Dashboard/Admin/ShowBookings.vue";
import Venues from "@/views/Dashboard/Admin/Venues.vue";
import UsersReports from "@/views/Dashboard/Admin/UsersReports.vue";

const routes =[
    {
        path: '/admin/dashboard',
        component: AdminHome,
    } ,
    {
        path: '/admin/events',
        component: Venues,
    } ,
    {
        path: '/admin/bookings',
        component: ShowBookings,
    },
    {
        path: '/admin/users',
        component: UsersReports,
    }
]
export default routes