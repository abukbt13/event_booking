import AdminHome from "@/views/Dashboard/Admin/AdminHome.vue";
import ShowBookings from "@/views/Dashboard/Admin/ShowBookings.vue";
import Venues from "@/views/Dashboard/Admin/Venues.vue";
import UsersReports from "@/views/Dashboard/Admin/UsersReports.vue";
import AdminReviews from "@/views/Dashboard/Admin/AdminReviews.vue";

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
    },
    {
        path: '/admin/reviews',
        component: AdminReviews,
    }
]
export default routes