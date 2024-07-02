import {defineStore} from 'pinia';
import {faker} from '@faker-js/faker';
import {Dayjs} from 'dayjs';

import { TgUserData, UserData } from '@/models/user.model.ts';
import UserService from '@/services/user.service.ts';

export type UserState = {
    tgUser?: TgUserData;
    user: UserData;
    selfStore: SelfStore;
    orders: Order[];
};

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
        tgUser: {},
        user: userDataLocal || {},
        selfStore: selfStoreLocal || {
            subscription: {
                has: false
            },
            created: false
        },
        orders: ordersLocal || []
    } as UserState),

    getters: {
        getOrderById() {
            return (id: number | string) => this.orders.find(o => o.id === id);
        },

        getUserById() {
            return (id: number) => this.user
        }
    },

    actions: {
        async setUser(user: any) {
            await UserService.initUser(user).then((res) => {
                if (res.status === 200) {
                    console.log('user exists (next)');
                    this.tgUser = res.data
                } else if (res.status === 201) {
                    console.log('created new user (next)');
                    this.tgUser = res.data
                }
            })
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
            this.user.avatar = avatar;

            localStorage.setItem('userData', JSON.stringify(this.user));
        },

        saveName(name: string) {
            this.user.username = name;

            localStorage.setItem('userData', JSON.stringify(this.user));
        }
    }

});
