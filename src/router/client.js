import Home from "@/views/Dashboard/Home.vue";
import Events from "@/views/Dashboard/Client/Events.vue";
import Venues from "@/views/Dashboard/Client/Venues.vue";

const routes =[
    {
        path: '/dashboard',
        component: Home,
    },
    {
        path: '/user/events',
        component: Events,
    },
    {
        path: '/venues',
        component: Venues,
    }
    ]
export default routes