import Home from "@/views/Dashboard/Home.vue";
import Events from "@/views/Dashboard/Client/Events.vue";
import Book from "@/views/Dashboard/Client/Book.vue";

const routes =[
    {
        path: '/dashboard',
        component: Home,
    },
    {
            path: '/client/events',
        component: Events,
    },
    {
        path: '/client/event/:id',
        component: Book,
    }
    ]
export default routes