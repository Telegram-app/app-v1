<template>
  <div class="account__orders">
    <template v-for="order in orders" :key="order.id">
      <div class="self-card">
        <OrderCard :order="order"/>
      </div>
    </template>
  </div>
</template>

<route lang="json">
{
"name": "orders"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
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
  
  data: () => ({}),
  
  computed: {
    orders() {
      return this.userStore.orders.sort((a,b) => {
        return a.date <= b.date ? 1 : -1
      }) as Order[];
    }
  }
  
});

</script>

<style scoped lang="scss">

.account__orders {
  margin: -15px;
  min-height: 100vh;
  padding: 15px;
  
  background-image: url('/images/users/profile-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  
  .self-card {
    background: linear-gradient(211deg, #EAF4FD 0%, #84C4E7 100%);
    
    &:first-child {
      margin-top: 0;
    }
  }
}

</style>