import {defineStore} from "pinia"
import {faker} from '@faker-js/faker'

export type UserState = {
    orders: Order[]
};

export type Order = {
    id: number | string;
    storeId: number | string;
    productId: number | string;
}

const ordersLocal: Order[] = JSON.parse(localStorage.getItem('orders') as string)

export const useUserStore = defineStore("user", {
    state: () => ({
        orders: ordersLocal || []
    } as UserState),

    getters: {
        getOrderById<Order>() {
            return (id: number | string) => this.orders.find(o => o.id === id)
        }
    },

    actions: {
        orderProduct(storeId: number | string, productId: number | string) {
            return new Promise<Order>(resolve => {
                let newOrder: Order = {
                    id: faker.number.int({min: 100000000, max: 999999999}),
                    storeId, productId
                }

                this.orders.push(newOrder)

                localStorage.setItem('orders', JSON.stringify(this.orders) as string)

                resolve(newOrder)
            })
        }
    }

})
