import {defineStore} from 'pinia';
import {faker} from '@faker-js/faker';
import {useMarketStore} from '@/stores/market.ts';
import {Dayjs} from 'dayjs';

export type UserState = {
    user: any,
    data: UserData,
    selfStore: SelfStore;
    orders: Order[];
};

export type UserData = {
    id: number;
    name: string;
    avatar: string;
}

export type Order = {
    id: number | string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled',
    storeId: number | string;
    productId: number | string;
    item: { type: 1 | 2; name: string; price: number };
    date: Date | Dayjs;
}

export type SelfStore = {
    subscription: {
        has: boolean;
        period: string | undefined;
    };
    created: boolean;
    data: undefined | SelfStoreData;
}

export type SelfStoreData = {
    id: number;
    image: string;
    banner: string;
    name: string;
    description: string;
}

const userDataLocal: UserData = JSON.parse(localStorage.getItem('userData') as string);
const ordersLocal: Order[] = JSON.parse(localStorage.getItem('orders') as string);
const selfStoreLocal: SelfStore = JSON.parse(localStorage.getItem('selfStore') as string);

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        data: userDataLocal || {
            id: 1,
            name: '',
            avatar: ''
        },
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
        },

        getUserById<UserData>() {
            return (id: number) => this.data
        }
    },

    actions: {
        setUser(user: any) {
            this.user = user;
        },

        orderProduct(storeId: number | string, productId: number | string, item: { type: 1 | 2; name: string; price: number }) {
            return new Promise<Order>(resolve => {

                let newOrder: Order = {
                    id: faker.number.int({min: 100000000, max: 999999999}),
                    status: 'pending',
                    storeId, productId,
                    item,
                    date: new Date()
                };

                this.orders.push(newOrder);

                localStorage.setItem('orders', JSON.stringify(this.orders));

                resolve(newOrder);
            });
        },

        setSubscription(period: string) {
            this.selfStore.subscription = {
                has: true,
                period
            };

            localStorage.setItem('selfStore', JSON.stringify(this.selfStore));
        },

        createStore(data: SelfStoreData) {
            data.id = faker.number.int({min: 1, max: 999999});
            this.selfStore.created = true;
            this.selfStore.data = data;

            localStorage.setItem('selfStore', JSON.stringify(this.selfStore));
        },

        saveAvatar(avatar: string) {
            this.data.avatar = avatar;

            localStorage.setItem('userData', JSON.stringify(this.data));
        },

        saveName(name: string) {
            this.data.name = name;

            localStorage.setItem('userData', JSON.stringify(this.data));
        }
    }

});
