import {defineStore} from "pinia"
import {generateFakeStore, Product, Store} from '@/models/store.model.ts';

export type MarketState = {
    stores: Store[];
};

// localStorage.removeItem('stores')
const storesLocal: Store[] = JSON.parse(localStorage.getItem('stores') as string)

export const useMarketStore = defineStore("market", {
    state: () => ({
        stores: storesLocal || [],
    } as MarketState),

    getters: {
        getStores(state) {
            return state.stores
        }
    },

    actions: {
        createNewStore(store: Store) {
            if (!store) return;

            this.stores.push(store);
        },

        findById(id: number | string) {
            return this.stores.find((store) => store.id === id) as Store;
        },

        findProductById(storeId: number | string, id: number | string) {
            const store = this.stores.find((store) => store.id === storeId) as Store;
            return store.products.find((product) => product.id === id) as Product
        },

        createFakeStores() {
            if (this.stores.length === 40) return

            for (let i = 0; i < 40; i++) {
                this.createNewStore(generateFakeStore())

                if (i === 39) {
                    localStorage.setItem('stores', JSON.stringify(this.stores) as string);
                }
            }
        }
    },

})
