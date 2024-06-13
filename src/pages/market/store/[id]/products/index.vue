<template>
  <div class="store__products">
    <h1>ТОВАРЫ</h1>
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

import {useFilter} from '@/stores/filters.ts';

export default defineComponent({
  name: 'StoreProductsPage',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const marketStore = useMarketStore();
    const filterStore = useFilter()

    return {router, route, marketStore, filterStore};
  },

  data: () => ({}),

  computed: {
    store() {
      return this.marketStore.findById(Number(this.route.params.id) as number);
    },
    storeHeader() {
      return {
        id: this.store.id,
        image: this.store.image,
        deals: this.store.deals,
        name: this.store.name,
        description: this.store.description
      }
    },
    storeProducts() {
      return {
        id: this.store.id,
        name: this.store.name
      }
    }
  },

  methods: {},

});

</script>

<style scoped lang="scss">

.store__products {
  margin-top: 15px;
}

</style>