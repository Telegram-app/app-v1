import { createRouter as createClientRouter, createWebHistory } from 'vue-router/auto'

export function createRouter() {
    const router = createClientRouter({
        history: createWebHistory(),
    })

    return router
}
