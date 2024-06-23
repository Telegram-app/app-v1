<template>
  <div class="store__products">
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <div class="store__products__container">
            <store-product-card v-for="product in store.products" :key="product.id" :product="product" :storeName="store.name" @toProductPage="toProductPage"/>
          </div>
        </template>
        
        <template #fallback>
          <div class="store__products__container">
            <store-product-card-skeleton v-for="i of 7" :key="'k' + i"/>
          </div>
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<route lang="json">
{
"name": "storeProducts"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useMarketStore} from '@/stores/market.ts';

export default defineComponent({
  name: 'StoreProductsPage',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const marketStore = useMarketStore();
    
    return {router, route, marketStore};
  },
  
  data: () => ({}),
  
  computed: {
    store() {
      return this.marketStore.findById(Number(this.route.params.id) as number);
    },
  },
  
  methods: {
    toProductPage(id: number | string) {
      this.router.push({name: 'product', params: {id: this.store.id, productId: id}});
    }
  },
  
});

</script>

<style scoped lang="scss">

.store__products__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 7px;
  grid-row-gap: 20px;
  padding: 15px 0;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
}

</style>