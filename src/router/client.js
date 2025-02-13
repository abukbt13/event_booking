import Home from "@/views/Dashboard/Home.vue";
import Events from "@/views/Dashboard/Client/Events.vue";

const routes =[
    {
        path: '/dashboard',
        component: Home,
    },
    {
        path: '/user/events',
        component: Events,
    }
    ]
export default routes