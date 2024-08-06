import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import January23 from '@/views/January23.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'January23',
        component: January23,
    },
    {
        path: '/january23',
        name: 'Home',
        component: Home,
    },
    // {
    //     path: '*',
    //     component: Home,
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
