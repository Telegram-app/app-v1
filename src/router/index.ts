import { createRouter as createClientRouter, createWebHistory } from 'vue-router/auto'

export function createRouter() {
    const router = createClientRouter({
        history: createWebHistory(),

        scrollBehavior: (to, from, savedPosition) => {
            return {
                top: 0,
                behavior: 'smooth',
            }
        }
    })


    return router
}
