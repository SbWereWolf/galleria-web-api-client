import { createRouter, createWebHistory } from 'vue-router'
import ApiLayout from '../api-clinet/ApiLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/api-web-client',
            name: 'web-client',
            component: ApiLayout,
        },
        {
            path: '/',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
    ],
})

export default router
