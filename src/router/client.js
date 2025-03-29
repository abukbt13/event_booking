import Events from "@/views/Dashboard/Client/Events.vue";
import ShowVenues from "@/views/Dashboard/Client/ShowVenues.vue";
import MyBookings from "@/views/Dashboard/Client/MyBookings.vue";
import ThisBooking from "@/views/Dashboard/Client/ThisBooking.vue";
import Checkout from "@/views/Dashboard/Client/Checkout.vue";
import ClientHome from "@/views/Dashboard/Client/ClientHome.vue";
import Boooking from "@/views/Dashboard/Client/Boooking.vue";

const routes =[

    {
        path: '/client/dashboard',
        component: ClientHome,
    },
    {
        path: '/client/events',
        component: Events,
    },
    {
        path: '/client/event/:id?',
        component: ShowVenues,
    },
    {
        path: '/booking/:id/:venue_id',
        component: Boooking,
    },
    {
        path: '/checkout/:id',
        component: Checkout,
    },
    {
        path: '/client/bookings',
        component: MyBookings,
    },
    {
        path: '/client/booking/:id',
        component: ThisBooking,
    }
    ]
export default routes