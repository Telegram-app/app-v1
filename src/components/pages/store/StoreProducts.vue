<template>
  <div class="store__products">
    <StoreProductCard v-for="product in products" :key="product.id" :product="product" :storeName="store.name" @toProductPage="toProductPage"></StoreProductCard>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';

import {Product} from '@/models/store.model.ts';
import {useRouter} from 'vue-router';

interface Store {
  id: string | number;
  name: string
}

const loadProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'StoreProducts',
  
  props: {
    store: {
      type: Object as PropType<Store>,
      required: true
    },
    products: {
      type: Array as PropType<Product[]>,
      required: true
    }
  },
  
  async setup() {
    const router = useRouter();
    const load = ref(await loadProducts())
    
    return {load, router};
  },
  
  methods: {
    toProductPage(id: number | string) {
      this.router.push({name: 'product', params: {id: this.store.id, productId: id}});
    }
  },
  
});

</script>

<style scoped lang="scss">


</style>