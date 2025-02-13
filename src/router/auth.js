import Login from "@/auth/Login.vue";
import Register from "@/auth/Register.vue";
import ForgotPassword from "@/auth/ForgotPassword.vue";
import Otp from "@/auth/Otp.vue";
import ResetPassword from "@/auth/ResetPassword.vue";
import Profile from "@/auth/Profile.vue";

const routes =[
    {
        path: '/auth/login',
        component: Login
    },
    {
        path: '/auth/register',
        component: Register
    },
    {
        path: '/auth/forget-password',
        component: ForgotPassword
    },
    {
        path: '/auth/otp/:email',
        component: Otp
    },
    {
        path: '/auth/reset_password/:email/:otp',
        component: ResetPassword
    },
    {
        path: '/user/profile',
        component: Profile
    }
]
export default routes