<template>
  <div class="store-orders__pending">
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
import dayjs from 'dayjs';
import {faker} from '@faker-js/faker';
import {Order} from '@/stores/user.ts';

export default defineComponent({
  name: 'StoreOrdersPending',
  
  props: [],
  
  data: () => ({
    orders: [
      { id: 1234567, status: 'pending', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 3123123, status: 'pending', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 4232552, status: 'pending', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 2346745, status: 'pending', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) },
      { id: 6856432, status: 'pending', storeId: 'OS-12312323', productId: '3214214', item: { type: 1, name: 'item', price: 100 }, date: faker.date.recent({ days: 15 }) }
    ] as Order[]
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

</style>