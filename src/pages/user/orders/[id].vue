<template>
  <div class="order">
    <h1>Заказ № {{ order.id }}</h1>
    <button class="button" @click="router.push({name: 'orderIssuing', params: { id: order.id }})">Выдача заказа</button>
    
    <button class="button" @click="router.push({name: 'orders'})">Заказы</button>
  </div>
</template>

<route lang="json">
{
"name": "order"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Order, useUserStore} from '@/stores/user.ts';

export default defineComponent({
  name: 'OrderPage',
  
  props: [],
  
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    
    return {router, route, userStore};
  },
  
  data: () => ({}),
  
  computed: {
    order() {
      return this.userStore.getOrderById(Number(this.route.params.id)) as Order;
    }
  },
  
});

</script>

<style scoped lang="scss">


</style>