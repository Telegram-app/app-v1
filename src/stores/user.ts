import {defineStore} from 'pinia';
import {faker} from '@faker-js/faker';

export type UserState = {
    selfStore: SelfStore;
    orders: Order[];
};

export type Order = {
    id: number | string;
    storeId: number | string;
    productId: number | string;
}

export type SelfStore = {
    subscription: {
        has: boolean,
        period: string | undefined
    };
    created: boolean;
}

const ordersLocal: Order[] = JSON.parse(localStorage.getItem('orders') as string);
const selfStoreLocal: SelfStore = JSON.parse(localStorage.getItem('selfStore') as string);

export const useUserStore = defineStore('user', {
    state: () => ({
        selfStore: selfStoreLocal || {
            subscription: {
                has: false
            },
            created: false
        },
        orders: ordersLocal || []
    } as UserState),

    getters: {
        getOrderById<Order>() {
            return (id: number | string) => this.orders.find(o => o.id === id);
        }
    },

    actions: {
        orderProduct(storeId: number | string, productId: number | string) {
            return new Promise<Order>(resolve => {
                let newOrder: Order = {
                    id: faker.number.int({min: 100000000, max: 999999999}),
                    storeId, productId
                };

                this.orders.push(newOrder);

                localStorage.setItem('orders', JSON.stringify(this.orders) as string);

                resolve(newOrder);
            });
        },

        setSubscription(period: string) {
            this.selfStore.subscription = {
                has: true,
                period
            };

            localStorage.setItem('selfStore', JSON.stringify(this.selfStore));
        }
    }

});