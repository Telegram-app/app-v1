<template>
  <div class="store-orders__completed">
    <div class="store-orders__filters">
      <div>
        <span class="store-orders__filters__item">Product <IconSelect w="8" h="10"/></span>
        <span class="store-orders__filters__item">Employee <IconSelect w="8" h="10"/></span>
        <span class="store-orders__filters__item">City <IconSelect w="8" h="10"/></span>
        <span class="store-orders__filters__item">Type <IconSelect w="8" h="10"/></span>
      </div>
      
      <span class="store-orders__filters__all">Show all</span>
    </div>
    
    <div class="store-orders__items">
      <div class="self-card" v-for="order in orders" :key="order.id">
        <OrderCard :order="order" color="white"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import {faker} from '@faker-js/faker';
import {Order} from '@/stores/user.ts';

export default defineComponent({
  name: 'StoreOrdersCompleted',
  
  props: [],
  
  data: () => ({
    orders: [
      { id: 4214213, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 4235346, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 5347788, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 6546432, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 2343467, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 6586799, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 2789767, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 5345253, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 2357908, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 5437424, status: 'completed', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
    ] as Order[]
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>