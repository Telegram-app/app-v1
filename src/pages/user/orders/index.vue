<template>
  <div class="orders">
    <h1>Заказы</h1>
    
    <div class="orders__items">
      <div class="orders__items__item" v-for="order in orders" :key="order.id">
        <span>Заказ № {{ order.id }}</span>
        <button class="button" @click="router.push({name: 'order', params: { id: order.id }})">К заказу</button>
      </div>
    </div>
    
    <button class="button" @click="router.push({ name: 'profile' })">Профиль</button>
  </div>
</template>

<route lang="json">
{
  "name": "orders"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRoute, useRouter} from 'vue-router';
import {Order, useUserStore} from '@/stores/user.ts';

export default defineComponent({
  name: 'OrdersPage',
  
  props: [],
  
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    
    return {router, route, userStore};
  },
  
  data: () => ({
  
  }),
  
  computed: {
    orders() {
      return this.userStore.orders as Order[]
    }
  }
  
})

</script>

<style scoped lang="scss">



</style>