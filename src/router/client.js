import Home from "@/views/Dashboard/Home.vue";
import Events from "@/views/Dashboard/Client/Events.vue";
import Book from "@/views/Dashboard/Client/Book.vue";
import MyBookings from "@/views/Dashboard/Client/MyBookings.vue";
import ThisBooking from "@/views/Dashboard/Client/ThisBooking.vue";
import Checkout from "@/views/Dashboard/Client/Checkout.vue";

const routes =[

    {
        path: '/client/events',
        component: Events,
    },
    {
        path: '/client/event/:id',
        component: Book,
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