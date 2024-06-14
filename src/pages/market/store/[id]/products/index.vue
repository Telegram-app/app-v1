<template>
  <div class="store__products">
    <StoreProductCard v-for="product in store.products" :key="product.id" :product="product" :storeName="store.name" @toProductPage="toProductPage"></StoreProductCard>
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

.store__products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 7px;
  grid-row-gap: 20px;
  margin: 0 -15px -15px;
  padding: 15px;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
}

</style>